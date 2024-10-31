"use client";

import { HardHat, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

interface HeaderProps {
  showProjects: boolean;
  setShowProjects: (show: boolean) => void;
  onOpenAdmin: () => void;
}

export default function Header({ showProjects, setShowProjects, onOpenAdmin }: HeaderProps) {
  return (
    <header className="px-6 py-4 border-b border-slate-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Button
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-4 py-2 h-auto font-medium"
          onClick={() => setShowProjects(!showProjects)}
        >
          {showProjects ? "View Projects" : "Saved Jobs"}
        </Button>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenAdmin}
            className="hover:bg-transparent focus:ring-0"
          >
            <Settings className="h-5 w-5 text-slate-600" />
          </Button>
          <div className="flex items-center space-x-2">
            <HardHat className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-semibold text-slate-900">Bid Tracker</span>
          </div>
        </div>
      </div>
    </header>
  );
}