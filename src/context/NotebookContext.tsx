import React, { createContext, useContext, useState, ReactNode } from "react";

export type Material = {
  id: string;
  type: "pdf" | "link" | "note";
  name: string;
  url?: string; // For PDF or link
  content?: string; // For a note
};

export type Notebook = {
  id: string;
  name: string;
  lastAccessed: number;
  materials: Material[];
};

type NotebookContextType = {
  notebook: Notebook | null;
  setNotebook: (notebook: Notebook) => void;
  notebooks: Notebook[];
  addNotebook: (name: string) => void;
  addMaterial: (material: Omit<Material, "id">) => void;
};

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

const FAKE_NOTEBOOKS_INITIAL: Notebook[] = [];

export function NotebookProvider({ children }: { children: ReactNode }) {
  const [notebooks, setNotebooks] = useState<Notebook[]>(FAKE_NOTEBOOKS_INITIAL);
  const [notebook, setNotebookState] = useState<Notebook | null>(null);

  const setNotebook = (nb: Notebook) => {
    setNotebookState(nb);
    setNotebooks((prev) =>
      prev.map((n) => (n.id === nb.id ? { ...n, lastAccessed: Date.now() } : n))
    );
  };

  const addNotebook = (name: string) => {
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name,
      lastAccessed: Date.now(),
      materials: [],
    };
    setNotebooks((prev) => [...prev, newNotebook]);
    setNotebookState(newNotebook);
  };

  const addMaterial = (material: Omit<Material, "id">) => {
    if (!notebook) return;
    const mat: Material = { id: Date.now().toString(), ...material };
    setNotebooks((prev) =>
      prev.map((nb) =>
        nb.id === notebook.id ? {
          ...nb,
          lastAccessed: Date.now(),
          materials: [...(nb.materials || []), mat],
        } : nb
      )
    );
    setNotebookState((nb) =>
      nb ? {
        ...nb,
        lastAccessed: Date.now(),
        materials: [...(nb.materials || []), mat],
      } : nb
    );
  };

  return (
    <NotebookContext.Provider value={{ notebook, setNotebook, notebooks, addNotebook, addMaterial }}>
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  const ctx = useContext(NotebookContext);
  if (!ctx) throw new Error("useNotebook must be used within NotebookProvider");
  return ctx;
}
