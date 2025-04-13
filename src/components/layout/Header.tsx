
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    navigate("/login");
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-6">
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
