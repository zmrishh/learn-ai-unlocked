import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const [currentMaterial, setCurrentMaterial] = useState("Neural Networks");

  const handleLogout = () => {
    // In a real app, this would clear the authentication state
    navigate("/login");
  };

  return (
    <header className="border-b sticky top-0 bg-background z-30">
      {/* Adjust left padding on small screens to account for AppLayout's mobile menu button */}
      {/* The menu button is roughly 40px wide + 16px left offset = 56px. Header default px-4 (16px). Need ~40px more, so pl-10 */}
      {/* Reset padding on md screens with md:px-6 (from sm:px-6 below) */}
      <div className="flex h-16 items-center px-4 sm:px-6 md:pl-6 pl-[4.5rem]">
        {/* Material title shown on small screens */}
        <div className="md:hidden text-sm font-medium truncate">
          {currentMaterial}
        </div>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-4"> {/* Adjusted space-x for smaller screens */}
          <div className="flex items-center gap-2 sm:gap-4"> {/* Adjusted gap for smaller screens */}
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10"> {/* Slightly smaller avatar for xs */}
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
