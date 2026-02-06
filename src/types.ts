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

export type GlobalContextType = {
  familyId: string;
  rootIndividual: Individual | null;
  setRootIndividual: React.Dispatch<React.SetStateAction<Individual | null>>;
};
