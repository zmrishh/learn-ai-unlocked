
import { useNotebook } from "@/context/NotebookContext";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { NotebookPen, NotebookTabs, Folder, NotepadText } from "lucide-react";

function MaterialBadge({ material }: { material: any }) {
  const Icon = material.type === "pdf"
    ? Folder
    : material.type === "link"
      ? NotebookTabs
      : NotepadText;
  return (
    <Badge variant="secondary" className="flex gap-1 items-center px-2 py-1">
      <Icon className="w-3 h-3 mr-1" />
      <span>{material.name}</span>
    </Badge>
  );
}

export default function Notebooks() {
  const { notebooks, setNotebook, addNotebook } = useNotebook();
  const [newNotebook, setNewNotebook] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!newNotebook.trim()) return;
    addNotebook(newNotebook.trim());
    setNewNotebook("");
    setTimeout(() => {
      navigate("/dashboard");
    }, 250);
  };

  return (
    <div className="max-w-3xl mx-auto pt-16 sm:pt-24 px-4 space-y-10">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-1">
        <NotebookPen className="w-6 h-6" /> Notebooks
      </h1>
      <p className="text-muted-foreground mb-8">
        Create a notebook to organize your learning. Each notebook contains your uploaded PDFs, useful links, and notes. 
      </p>
      <div className="flex gap-2 items-center max-w-md">
        <Input
          value={newNotebook}
          onChange={(e) => setNewNotebook(e.target.value)}
          placeholder="Enter notebook name"
          onKeyDown={e => { if (e.key === "Enter") handleCreate(); }}
        />
        <Button onClick={handleCreate} disabled={!newNotebook.trim()}>Create Notebook</Button>
      </div>
      <div className="mt-12 space-y-6">
        {notebooks.length === 0 && <p className="text-muted-foreground">No notebooks yet. Create your first notebook above!</p>}
        {notebooks.map((nb) => (
          <Card key={nb.id} className="hover-scale transition border-2 border-transparent hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <NotebookTabs className="w-5 h-5 text-primary" />
                  {nb.name}
                </CardTitle>
                <CardDescription>
                  Last accessed:{" "}
                  <span className="text-xs text-gray-400">{new Date(nb.lastAccessed).toLocaleString()}</span>
                </CardDescription>
              </div>
              <Button onClick={() => { setNotebook(nb); navigate("/dashboard"); }}>
                Open
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mt-2">
                {(nb.materials && nb.materials.length > 0) ? (
                  nb.materials.map((mat: any) => <MaterialBadge key={mat.id} material={mat} />)
                ) : (
                  <Badge variant="outline">No learning materials yet</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
