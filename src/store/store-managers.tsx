'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface StoreContext {
  manager: string;
  updateManager: (newManager: string) => void;
}

const Store = createContext<StoreContext | null>(null);

function ManagerProvider({ children }: Props): React.ReactNode {
  const [manager, setManager] = useState<string>('npm');

  useEffect(() => {
    const localManager = localStorage.getItem('manager');
    if (localManager) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setManager(localManager);
    }
  }, []);

  const updateManager = (newManager: string) => {
    setManager(newManager);
    localStorage.setItem('manager', newManager);
  };

  return (
    <Store.Provider value={{ manager, updateManager }}>
      {children}
    </Store.Provider>
  );
}

function useStore() {
  const context = useContext(Store);

  if (!context) {
    throw new Error('useStore must be used within a Store.Provider');
  }

  return context;
}

export const useManager = () => useStore().manager;
export const useSetManager = () => useStore().updateManager;

export default ManagerProvider;
