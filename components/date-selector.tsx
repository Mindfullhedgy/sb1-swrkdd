"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

interface DateSelectorProps {
  label: string;
  date?: Date;
  onSelect: (date?: Date) => void;
}

export default function DateSelector({ label, date, onSelect }: DateSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="text-xs text-slate-500 mb-1 block">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-white border-slate-200 text-slate-900",
              "hover:bg-slate-50 hover:text-slate-900 focus:ring-2 focus:ring-slate-200",
              !date && "text-slate-500 hover:text-slate-600"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MM/dd/yyyy") : "Select"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onSelect(newDate);
              setOpen(false);
            }}
            initialFocus
            className="rounded-lg border border-slate-200"
            classNames={{
              day: "h-9 w-9 text-slate-600 aria-selected:bg-yellow-400 aria-selected:text-slate-900 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900",
              day_selected: "bg-yellow-400 text-slate-900 hover:bg-yellow-400 hover:text-slate-900 focus:bg-yellow-400 focus:text-slate-900",
              day_today: "bg-slate-100 text-slate-900",
              head_cell: "text-slate-500",
              nav_button: "text-slate-600 hover:bg-slate-100",
              nav_button_previous: "!absolute left-1 top-2",
              nav_button_next: "!absolute right-1 top-2",
              caption: "relative flex justify-center pt-1 text-slate-600 font-medium"
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}