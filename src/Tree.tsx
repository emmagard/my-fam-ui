import TreeNode from "./TreeNode";

const Tree = ({data}) => {
  if (!data) {
    return null;
  }

  const dataArr = data;

  return (
    <ul>
      {dataArr.map((node) => { 
        return (
          <TreeNode key={`${node?.name}-${node?.id}`} node={node} />
        )
      })}
    </ul>
  );
}

export default Tree;