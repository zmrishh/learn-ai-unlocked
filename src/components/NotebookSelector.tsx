
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNotebook } from "@/context/NotebookContext";

export function NotebookSelector({ open }: { open: boolean }) {
  const { notebooks, setNotebook, addNotebook } = useNotebook();
  const [notebookName, setNotebookName] = useState("");
  const [creating, setCreating] = useState(false);

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select or Create a Notebook</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {notebooks.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm">Existing Notebooks:</p>
              <div className="flex flex-col gap-2">
                {notebooks.map((notebook) => (
                  <Button key={notebook.id} variant="secondary" onClick={() => setNotebook(notebook)}>
                    {notebook.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium">Or create a new notebook</label>
            <div className="flex mt-2 gap-2">
              <Input
                value={notebookName}
                placeholder="Enter notebook name"
                onChange={(e) => setNotebookName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && notebookName.trim()) {
                    setCreating(true);
                    addNotebook(notebookName.trim());
                    setNotebookName("");
                    setCreating(false);
                  }
                }}
                disabled={creating}
              />
              <Button
                onClick={() => {
                  setCreating(true);
                  if (notebookName.trim()) {
                    addNotebook(notebookName.trim());
                    setNotebookName("");
                  }
                  setCreating(false);
                }}
                disabled={creating || !notebookName.trim()}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
