
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Notebook = {
  id: string;
  name: string;
};

type NotebookContextType = {
  notebook: Notebook | null;
  setNotebook: (notebook: Notebook) => void;
  notebooks: Notebook[];
  addNotebook: (name: string) => void;
};

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

const FAKE_NOTEBOOKS_INITIAL: Notebook[] = [];

export function NotebookProvider({ children }: { children: ReactNode }) {
  const [notebooks, setNotebooks] = useState<Notebook[]>(FAKE_NOTEBOOKS_INITIAL);
  const [notebook, setNotebook] = useState<Notebook | null>(null);

  const addNotebook = (name: string) => {
    const newNotebook = { id: Date.now().toString(), name };
    setNotebooks((prev) => [...prev, newNotebook]);
    setNotebook(newNotebook);
  };

  return (
    <NotebookContext.Provider value={{ notebook, setNotebook, notebooks, addNotebook }}>
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  const ctx = useContext(NotebookContext);
  if (!ctx) throw new Error("useNotebook must be used within NotebookProvider");
  return ctx;
}
