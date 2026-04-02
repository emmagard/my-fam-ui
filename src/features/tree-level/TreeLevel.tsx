const TreeLevel = ({
  children
 } : {
  children: React.ReactNode;
 } ) => {
  return (
    <div style={{ marginBottom: "100px" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
        {children}
      </div>
    </div>
  );
}

export default TreeLevel;
