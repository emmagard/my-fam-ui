import { useRef, useEffect, useState } from "react";
import type { Individual, Line, Pos, RenderedIndividual } from './types';
import TreeNode from "./features/tree-node/TreeNode";
import TreeLevel from "./features/tree-level/TreeLevel";
import TreeNodeWithSpouse from "./features/tree-node/TreeNodeWithSpouse";

const GENERATION_LABELS = ['Parents', 'Grandparents', 'Great-grandparents', 'Great-great-grandparents'];
const getGenerationLabel = (depth: number) => GENERATION_LABELS[depth] ?? `${depth}-generation ancestors`;

const ANCESTOR_LINE_COLORS = ['#9b8ed4', '#c4b5f7', '#ddd0ff', '#eee8ff'];
const getAncestorColor = (depth: number) => ANCESTOR_LINE_COLORS[Math.min(depth, ANCESTOR_LINE_COLORS.length - 1)];

/**
 * Get the ancestor tiers for a given set of parents.
 * @param parents The parents to get ancestor tiers for.
 * @param depth The current depth in the ancestor tree.
 * @returns An array of ancestor tiers.
 */
function getAncestorTiers(parents: Individual[], depth: number = 0): {
  depth: number;
  people: RenderedIndividual[];
}[] {
  if (!parents || parents.length === 0) return [];

  const nextGenParents = parents.flatMap(p => p.relationships?.parents || []);
  const deeperTiers = getAncestorTiers(nextGenParents, depth + 1);

  const tier = {
    depth,
    people: parents.flatMap(p => [
      ...(p.relationships?.parents  || []).map(gp => ({ ...gp,  _sourceId: p.id, _isSibling: false })),
    ]),
    rawParents: parents,
  };

  return [...deeperTiers, tier];
}

function FamilyTree({ data }: { data: Individual }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Record<string, HTMLElement | null>>({});
  const [lines, setLines] = useState<Line[]>([]);

  const setRef = (key: string, el: HTMLElement | null) => { if (el) nodeRefs.current[key] = el; };

  const parents  = data.relationships?.parents  || [];
  const siblings = data.relationships?.siblings || [];
  const spouses  = data.relationships?.spouses  || [];
  const children = data.relationships?.children || [];

  const ancestorTiers = getAncestorTiers(parents);

  const sibChildrenOf: Record<string, Individual[]> = {};
  
  siblings.forEach(s => {
    sibChildrenOf[s.id] = s.relationships?.children || [];
  });

  const allSibChildren = siblings.flatMap(s =>
    (sibChildrenOf[s.id] || []).map(ch => ({ ...ch, _sibId: s.id }))
  );

  const parentSibs = parents.flatMap(p =>
    (p.relationships?.siblings || []).map(ps => ({ ...ps, _sourceId: p.id }))
  );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const rect = container.getBoundingClientRect();
    const newLines: Line[] = [];

    /**
     * Get the position of a node.
     * @param key The key of the node.
     * @returns The position of the node or null if not found.
     */
    const pos = (key: string) => {
      const el = nodeRefs.current[key];

      if (!el) return null;

      const r = el.getBoundingClientRect();

      return {
        x:      r.left - rect.left + r.width / 2,
        y:      r.top  - rect.top  + r.height / 2,
        top:    r.top  - rect.top,
        bottom: r.top  - rect.top + r.height,
      };
    };

    const stepLine = (a, b, color) => {
    if (a && b) {
      const midY = (a.bottom + b.top) / 2;
      newLines.push({ 
        type: 'step',
        x1: a.x, y1: a.bottom, 
        mx: a.x, my: midY,      // elbow point
        x2: b.x, y2: b.top, 
        color 
      });
    }
  };

    // const line  = (a: Pos | null, b: Pos | null, color: string, dash = false) => { if (a && b) newLines.push({ x1: a.x, y1: a.bottom, x2: b.x, y2: b.top, color, dash }); };
    const hline = (a: Pos | null, b: Pos | null, color: string, dash = false) => { if (a && b) newLines.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, color, dash }); };

    const sub = pos('subject');

    // Draw lines for each ancestor tier
    ancestorTiers.forEach(({ depth, people }) => {
      const color = getAncestorColor(depth);
      people.forEach(person => {
        const childPos = depth === 0
          ? pos(`parent-${person._sourceId}`)
          : pos(`anc-${depth}-${person._sourceId}`);
        if (person._isSibling) {
          hline(pos(`anc-${depth + 1}-sib-${person.id}`), childPos, '#7dd3c8', true);
        } else {
          stepLine(pos(`anc-${depth + 1}-${person.id}`), childPos, color);
        }
      });
    });

    // Parents → subject
    parents.forEach(p => {
      (p.relationships?.spouses || [])
        .filter(sp => !parentIds.has(sp.id))
        .forEach(sp => {
          hline(pos(`parent-${p.id}`), pos(`pspouse-${sp.id}`), '#5a9e6e');
        });
    });
    // Siblings → subject (horizontal)
    siblings.forEach(s => {
      hline(pos(`sibling-${s.id}`), sub, '#5ea8a0', true);
      sibChildrenOf[s.id].forEach(ch => stepLine(pos(`sibling-${s.id}`), pos(`sibch-${ch.id}`), '#f0a080'));
    });

    parentSibs.forEach(ps => {
      hline(pos(`psib-${ps.id}`), pos(`parent-${ps._sourceId}`), '#7dd3c8', true);
    });

    // Spouses → subject (horizontal)
    // spouses.forEach(sp => hline(pos(`spouse-${sp.id}`), sub, '#5a9e6e'));

    // Subject → children
    children.forEach(ch => stepLine(sub, pos(`child-${ch.id}`), '#d47b5e'));

    setLines(newLines);
  }, []);

  const parentIds = new Set(parents.map(p => p.id));

  return (
    <div style={{ position: 'relative' }}>
      <div ref={containerRef} className="tree-container">
        <svg style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', overflow: 'visible' }}
             width="100%" height="100%">
          {lines.map((l, i) => l.type === 'step' ? (
            <path key={i}
              d={`M ${l.x1} ${l.y1} L ${l.mx} ${l.my} L ${l.x2} ${l.my} L ${l.x2} ${l.y2}`}
              stroke={l.color} strokeWidth="1.5" opacity="0.55" fill="none"
            />
          ) : (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke={l.color} strokeWidth="1.5" opacity="0.55"
              strokeDasharray={l.dash ? '4 3' : 'none'}
            />
          ))}
        </svg>

        {/* Ancestor tiers — rendered oldest first */}
        {ancestorTiers.map(({ depth, people }) => {
          const parents  = people.filter(p => !p._isSibling);
          const siblings = people.filter(p =>  p._isSibling);

          if (people.length === 0) return null;

          return (
            <TreeLevel key={depth}>
              {parents.map(p => (
                <div key={`anc-${depth + 1}-${p.id}`} ref={el => setRef(`anc-${depth + 1}-${p.id}`, el)}>
                  <TreeNode person={p} role={getGenerationLabel(depth + 1).toLowerCase().replace(/s$/, '')} />
                </div>
              ))}
              {siblings.map(s => (
                <div key={`anc-${depth + 1}-sib-${s.id}`} ref={el => setRef(`anc-${depth + 1}-sib-${s.id}`, el)}>
                  <TreeNode person={s} role="ancestor's sibling" />
                </div>
              ))}
            </TreeLevel>
          );
        })}

        {/* Parents TreeLevel */}
        {parents.length > 0 && (
          <TreeLevel>
            {/* Left parent's siblings */}
            {(parents[0]?.relationships?.siblings || []).map(ps => (
              <div key={`psib-${ps.id}`} ref={el => setRef(`psib-${ps.id}`, el)}>
                <TreeNodeWithSpouse person={ps} role="parent and spouse"  setRef={setRef}/>
              </div>
            ))}
  
            {/* Parents grouped in a couple border */}
            <div style={{
              display: 'flex',
              gap: '12px',
              border: '1.5px solid white',
              borderRadius: '12px',
              padding: '8px',
              flex: 0,
            }}>
              {parents.map((p, i) => (
                <div className="flex flex-row" key={p.id} ref={el => setRef(`parent-${p.id}`, el)}>
                  <TreeNode person={p} role="parent" /> {i < parents.length - 1 && <span style={{ margin: '0 4px' }}>+</span>}
                </div>
              ))}
            </div>

            {/* Right parent's siblings */}
            {(parents[1]?.relationships?.siblings || []).map(ps => (
              <div key={`psib-${ps.id}`} ref={el => setRef(`psib-${ps.id}`, el)}>
                <TreeNodeWithSpouse person={ps} role="parent and spouse"  setRef={setRef}/>
              </div>
            ))}
          </TreeLevel>
        )}

        {/* Subject row */}
        <TreeLevel>
          {siblings.map(s => (
            <div key={`sibling-${s.id}`} ref={el => setRef(`sibling-${s.id}`, el)} className={`flex gap-2 ${s?.relationships?.spouses.length > 0 ? 'border-[1.5px] border-white rounded-xl p-[8px]' : ''}`}>
              <TreeNodeWithSpouse person={s} role="sibling and spouse" setRef={setRef} />
            </div>
          ))}

          {/* Subject + spouses grouped in a couple border */}
          <div className={`flex gap-2 ${spouses.length > 0 ? 'border-[1.5px] border-white rounded-xl p-[8px]' : ''}`}>
            <TreeNodeWithSpouse person={data} role="subject and spouse" setRef={setRef} />
          </div>
        </TreeLevel>

        {/* Children tier — grouped by parent */}
        {(children.length > 0 || allSibChildren.length > 0) && (
          <TreeLevel>
            {/* Siblings' children, each group under their parent */}
            {siblings.map(s => (
              (sibChildrenOf[s.id] || []).map(ch => (
                <div key={`sibch-${ch.id}`}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div ref={el => setRef(`sibch-${ch.id}`, el)}>
                    <TreeNode person={ch} role="niece/nephew" />
                  </div>
                </div>
              ))
            ))}

            {/* Subject's own children */}
            {children.map(ch => (
              <div key={ch.id} ref={el => setRef(`child-${ch.id}`, el)}>
                <TreeNode person={ch} role="child" />
              </div>
            ))}
          </TreeLevel>
        )}
      </div>
    </div>
  );
}


export default FamilyTree