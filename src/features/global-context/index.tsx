import React, { createContext, useState } from 'react';
import type { GlobalContextType, Individual } from '../../types';

const GlobalContext = createContext({} as GlobalContextType);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const familyId: string = '1'; // root individual id
  const [rootIndividual, setRootIndividual] = useState<Individual | null>(null);
  const levelsMap = new Map<number, Individual[]>();

  return (
    <GlobalContext.Provider value={{familyId, setRootIndividual, rootIndividual, levelsMap }}>
      {children}
    </GlobalContext.Provider>
  );
};
export { GlobalContext };