
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

export type Material = {
  id: string;
  type: "pdf" | "link" | "note";
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
  addMaterial: (notebookId: string, material: Omit<Material, "id" | "created_at" | "updated_at">) => Promise<void>;
  loading: boolean;
};

const NotebookContext = createContext<NotebookContextType | undefined>(undefined);

export function NotebookProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notebook, setNotebookState] = useState<Notebook | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch notebooks and materials for current user
  const fetchNotebooks = async () => {
    setLoading(true);
    if (!user) {
      setNotebooks([]);
      setNotebookState(null);
      setLoading(false);
      return;
    }

    // fetch notebooks
    const { data: nbData, error: nbError } = await supabase
      .from("notebooks")
      .select("id, name, last_accessed, created_at, updated_at")
      .eq("user_id", user.id)
      .order("last_accessed", { ascending: false });

    if (nbError) {
      setNotebooks([]);
      setNotebookState(null);
      setLoading(false);
      return;
    }

    // For each notebook, fetch its materials
    const notebooksWithMaterials: Notebook[] = [];
    for (const nb of nbData || []) {
      const { data: materials, error: mError } = await supabase
        .from("materials")
        .select("id, name, type, url, content, created_at, updated_at")
        .eq("notebook_id", nb.id)
        .order("created_at", { ascending: true });

      notebooksWithMaterials.push({
        id: nb.id,
        name: nb.name,
        lastAccessed: nb.last_accessed,
        createdAt: nb.created_at,
        updatedAt: nb.updated_at,
        materials: mError ? [] : materials || [],
      });
    }

    setNotebooks(notebooksWithMaterials);

    // If notebook context is empty or points to an old notebook, pick latest or null
    if (notebook && notebooksWithMaterials.some(n => n.id === notebook.id)) {
      setNotebookState(notebooksWithMaterials.find(n => n.id === notebook.id) || null);
    } else {
      setNotebookState(notebooksWithMaterials[0] || null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotebooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const refresh = fetchNotebooks;

  // create notebook for current user
  const addNotebook = async (name: string) => {
    if (!user) return;
    await supabase.from("notebooks").insert({
      name,
      user_id: user.id,
    });
    await fetchNotebooks();
  };

  // create a new material attached to notebookId
  const addMaterial = async (
    notebookId: string,
    material: Omit<Material, "id" | "created_at" | "updated_at">
  ) => {
    await supabase.from("materials").insert({
      ...material,
      notebook_id: notebookId,
    });
    await fetchNotebooks();
  };

  // update notebook selection
  const setNotebook = (nb: Notebook | null) => {
    setNotebookState(nb);
  };

  return (
    <NotebookContext.Provider
      value={{
        notebooks,
        notebook,
        setNotebook,
        addNotebook,
        addMaterial,
        loading,
        refresh,
      }}
    >
      {children}
    </NotebookContext.Provider>
  );
}

export function useNotebook() {
  const ctx = useContext(NotebookContext);
  if (!ctx) throw new Error("useNotebook must be used within NotebookProvider");
  return ctx;
}
