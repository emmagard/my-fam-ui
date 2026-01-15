import Tree from './Tree';

const TreeNode = ({ node }) => {
  if (!node) {return null}
  console.log('node:', node);
  return (
    <li>
      {node?.name}
      <Tree data={node?.relationships?.children} />
    </li>
  );
};

export default TreeNode;