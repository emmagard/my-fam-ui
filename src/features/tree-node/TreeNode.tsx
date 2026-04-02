import type { Individual } from '../../types';

const TreeNode = ({
  person,
  role = '',
  isSubject = false
} : {
  person: Individual,
  role?: string,
  isSubject?: boolean
} ) => {
  return (
    <div className={`node-card ${isSubject ? "subject" : ""} ${role === "spouse" ? "spouse" : ""}`}>
      <div className="node-name">{person.name}<span className="node-id"> (id: {person.id})</span></div>

    </div>
  );
}

export default TreeNode;
