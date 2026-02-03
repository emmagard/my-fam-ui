export type Individual = {
  id: string;
  name: string;
  relationships: {
    children: Individual[];
    parents: Individual[];
    siblings: Individual[];
    spouses: Individual[];
  };
};

export type Relationship = {
  id: string;
  value: string;
};