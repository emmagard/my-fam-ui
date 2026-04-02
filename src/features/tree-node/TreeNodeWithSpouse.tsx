import type { Individual } from '../../types';
import TreeNode from './TreeNode';

function TreeNodeWithSpouse({ person, role, isSubject, setRef }: { person: Individual, role?: string, isSubject?: boolean, setRef: (key: string, el: HTMLElement | null) => void }) {
  const hasSpouse = person.relationships?.spouses?.length > 0;
  
  return (
    <div className="individual-and-maybe-spouse">
      <TreeNode person={person} role={role} isSubject={isSubject} />
      {hasSpouse && person.relationships?.spouses.map(spouse => (
        <div className="flex flex-col" key={`spouse-${spouse.id}`} ref={el => setRef(`spouse-${spouse.id}`, el)}>
          <span className="self-center">+</span>
          <TreeNode person={spouse} role="spouse" />
        </div>
      ))}
    </div>
  );
}

export default TreeNodeWithSpouse;