"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useUserStore } from "@/Store";

function MobileNavbar() {
  const user = useUserStore((state) => state.username);
  return (
    <nav className="flex items-center p-2 sm:container lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-auto">
          <Button size={"icon"} variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link to="/createWhiteBoard">Whiteboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/classifier">Image Classifier</Link>
          </DropdownMenuItem>
          {user && (
            <DropdownMenuItem>
              <Link to="/">Logout</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default MobileNavbar;
