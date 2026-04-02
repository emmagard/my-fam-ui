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
  levelsMap: Map<number, Individual[]>;
};

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  dash?: boolean;
};

export type Pos = {
  x: number;
  y: number;
  top: number;
  bottom: number;
};

export type RenderedIndividual = Individual & {
  _sourceId: string;
  _isSibling: boolean;
};
