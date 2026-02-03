import React, { createContext, useState } from 'react';
import type { Individual } from '../../types';

const GlobalContext = createContext({});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const familyId: string = '1'; // root individual id
  const [rootIndividual, setRootIndividual] = useState<Individual | null>(null);
  const [globalIds, setGlobalIds] = useState(new Set());

  

  return (
    <GlobalContext.Provider value={{ globalIds, setGlobalIds, familyId, setRootIndividual, rootIndividual }}>
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext };