import type { Individual } from './types';
import TreeNode from './features/tree-node/TreeNode';

const Family = ({rootPerson} : {rootPerson: Individual}) => {
if (!rootPerson) return null;

  return (
    <div className="family-tree">
      <TreeNode 
        person={rootPerson} 
        visited={new Set()} 
        showParents={true}
        showChildren={true}
        showSiblings={true}
        showSpouses={true}
      />
    </div>
  );
};

export default Family;