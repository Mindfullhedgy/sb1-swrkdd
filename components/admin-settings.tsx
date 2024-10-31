"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import DateSelector from "@/components/date-selector";
import { Settings } from "lucide-react";

interface AdminSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: () => Promise<void>;
  isLoading: boolean;
  postedFrom?: Date;
  postedTo?: Date;
  deadlineFrom?: Date;
  deadlineTo?: Date;
  setPostedFrom: (date?: Date) => void;
  setPostedTo: (date?: Date) => void;
  setDeadlineFrom: (date?: Date) => void;
  setDeadlineTo: (date?: Date) => void;
}

export default function AdminSettings({
  open,
  onOpenChange,
  onSearch,
  isLoading,
  postedFrom,
  postedTo,
  deadlineFrom,
  deadlineTo,
  setPostedFrom,
  setPostedTo,
  setDeadlineFrom,
  setDeadlineTo,
}: AdminSettingsProps) {
  const handleSearch = async () => {
    console.log('\n🔍 Initiating search with parameters:', {
      postedFrom,
      postedTo,
      deadlineFrom,
      deadlineTo
    });
    await onSearch();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] bg-white">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-slate-900">
            <Settings className="h-5 w-5" />
            Admin Settings
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900">Posted Date Range</h3>
            <p className="text-sm text-slate-600">Select the date range when opportunities were posted</p>
            <div className="grid grid-cols-2 gap-4">
              <DateSelector
                label="From"
                date={postedFrom}
                onSelect={setPostedFrom}
              />
              <DateSelector
                label="To"
                date={postedTo}
                onSelect={setPostedTo}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-slate-900">Response Deadline Range</h3>
            <p className="text-sm text-slate-600">Select the range for opportunity response deadlines</p>
            <div className="grid grid-cols-2 gap-4">
              <DateSelector
                label="From"
                date={deadlineFrom}
                onSelect={setDeadlineFrom}
              />
              <DateSelector
                label="To"
                date={deadlineTo}
                onSelect={setDeadlineTo}
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-600">
              This will fetch opportunities from SAM.gov based on your selected date ranges.
            </p>
            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 text-slate-900 
                       focus:ring-2 focus:ring-yellow-200 transition-all disabled:opacity-50"
              onClick={handleSearch}
              disabled={isLoading}
            >
              {isLoading ? "Making API Call..." : "Make API Call"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}