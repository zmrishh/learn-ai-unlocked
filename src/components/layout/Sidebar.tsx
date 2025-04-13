
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  Home,
  LayoutDashboard,
  MessageSquare, 
  SquareStack,
  Upload,
  User,
  FileQuestion,
  History,
  Network
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/smart-notes", label: "Smart Notes", icon: BookOpen },
    { href: "/chat-pdf", label: "Chat with PDF", icon: MessageSquare },
    { href: "/quiz", label: "Quiz Me", icon: FileQuestion },
    { href: "/flashcards", label: "Flashcards", icon: SquareStack },
    { href: "/mindmap", label: "Mind Map", icon: Network },
    { href: "/history", label: "History", icon: History },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <div className={cn("pb-12 min-h-screen border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            <h2 className="text-lg font-semibold tracking-tight">LearnAI</h2>
          </Link>
        </div>
        <Separator />
        <ScrollArea className="px-1">
          <div className="space-y-1 p-2">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={location.pathname === link.href ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  location.pathname === link.href && "active-link"
                )}
                asChild
              >
                <Link to={link.href} className="flex items-center">
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
