import type { Individual } from './types';
import TreeNodeRelation from './TreeNodeRelation';

const TreeNode = ({ person, visited, showParents, showChildren, showSiblings, showSpouses, showBorder = true }: { person: Individual, visited: Set<string>, showParents: boolean, showChildren: boolean, showSiblings: boolean, showSpouses: boolean, showBorder?: boolean }) => {
  if (!person) return null;

  // If already rendered, show reference
  if (visited.has(person?.id)) {
    return (
      <div className="tree-node duplicate">
        <div className="person-card reference">
          {person?.name} (see above)
        </div>
      </div>
    );
  }

  // Mark as visited
  const newVisited = new Set(visited);
  newVisited.add(person?.id);

  return (
    <div className="tree-node">
      {showParents && <TreeNodeRelation type="parents" persons={person?.relationships?.parents} newVisited={newVisited} />}

      <div className="flex flex-row">
        <div className={`flex flex-row  ${ showBorder ? 'self-baseline p-2 border border-gray-300' : ''}`}>
          <h3>{person?.name}</h3>
          {showSpouses && <TreeNodeRelation type="spouses" persons={person?.relationships?.spouses} newVisited={newVisited} />}
        </div>
        <div className='flex flex-row'>
          {showSiblings && <TreeNodeRelation type="siblings" persons={person?.relationships?.siblings} newVisited={newVisited} />}
        </div>
      </div>
       
      {showChildren && <TreeNodeRelation type="children" persons={person?.relationships?.children} newVisited={newVisited} />}
    </div>
  );
}

export default TreeNode;
