"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarPickProps {
  name: string;
  handleInputChange: (name: string, value: any) => void;
}

export function CalendarPick({ name, handleInputChange }: CalendarPickProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      handleInputChange(name, formattedDate);
    } else {
      handleInputChange(name, null);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          locale={es}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
