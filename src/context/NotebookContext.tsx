import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import * as api from '@/integrations/api/client';

export type Material = {
  id: string;
  type: 'pdf' | 'link' | 'note';
  name: string;
  url?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
};

export type Notebook = {
  id: string;
  name: string;
  lastAccessed: string;
  createdAt: string;
  updatedAt: string;
  materials: Material[];
};

type NotebookContextType = {
  notebooks: Notebook[];
  notebook: Notebook | null;
  setNotebook: (notebook: Notebook | null) => void;
  refresh: () => void;
  addNotebook: (name: string) => Promise<void>;
  addMaterial: (notebookId: string, material: Omit<Material, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  loading: boolean;
};

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

export function NotebookProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notebook, setNotebookState] = useState<Notebook | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchNotebooks = async () => {
    setLoading(true);
    if (!user || !token) {
      setNotebooks([]);
      setNotebookState(null);
      setLoading(false);
      return;
    }
    try {
      const nbData = await api.listNotebooks(token);
      const notebooksWithMaterials: Notebook[] = [];
      for (const nb of nbData) {
        const materials = await api.listMaterials(token, nb.id);
        notebooksWithMaterials.push({
          id: nb.id,
          name: nb.name,
          lastAccessed: nb.lastAccessed,
          createdAt: nb.createdAt,
          updatedAt: nb.updatedAt,
          materials,
        });
      }
      setNotebooks(notebooksWithMaterials);
      if (notebook && notebooksWithMaterials.some(n => n.id === notebook.id)) {
        setNotebookState(notebooksWithMaterials.find(n => n.id === notebook.id) || null);
      } else {
        setNotebookState(notebooksWithMaterials[0] || null);
      }
    } catch (e) {
      setNotebooks([]);
      setNotebookState(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotebooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, token]);

  const refresh = fetchNotebooks;

  const addNotebook = async (name: string) => {
    if (!token) return;
    await api.createNotebook(token, name);
    await fetchNotebooks();
  };

  const addMaterial = async (
    notebookId: string,
    material: Omit<Material, 'id' | 'created_at' | 'updated_at'>
  ) => {
    if (!token) return;
    await api.addMaterial(token, notebookId, material);
    await fetchNotebooks();
  };

  const setNotebook = (nb: Notebook | null) => {
    setNotebookState(nb);
  };

  return (
    <NotebookContext.Provider
      value={{ notebooks, notebook, setNotebook, addNotebook, addMaterial, loading, refresh }}
    >
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  const ctx = useContext(NotebookContext);
  if (!ctx) throw new Error('useNotebook must be used within NotebookProvider');
  return ctx;
}
