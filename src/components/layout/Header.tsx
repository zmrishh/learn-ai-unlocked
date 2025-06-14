
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { LogOut, SwitchCamera } from "lucide-react";
import { useState } from "react";
import { useNotebook } from "@/context/NotebookContext";
import { Badge } from "@/components/ui/badge";
import { NotebookSelector } from "../NotebookSelector";

export function Header() {
  const navigate = useNavigate();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const { notebook } = useNotebook();
  const [currentMaterial, setCurrentMaterial] = useState("Neural Networks");

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="border-b sticky top-0 bg-background z-30">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-2">
          {notebook && (
            <>
              <Badge variant="secondary" className="text-xs px-2 py-1 rounded">
                Notebook: {notebook.name}
              </Badge>
              <Button variant="ghost" size="icon" onClick={() => setSelectorOpen(true)} className="ml-1" title="Switch Notebook">
                <SwitchCamera className="h-5 w-5" />
              </Button>
              <NotebookSelector open={selectorOpen} />
            </>
          )}
        </div>
        <div className="md:hidden text-sm font-medium truncate max-w-[150px] ml-16">{currentMaterial}</div>
        <div className="ml-auto flex items-center space-x-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium">User Student</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
