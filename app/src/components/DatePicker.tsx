import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@shadcn-ui/lib/utils";
import { Button } from "@shadcn-ui/components/ui/button";
import { Calendar } from "@shadcn-ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcn-ui/components/ui/popover";

interface DatePickerProps {
  date?: Date;
  toDate?: Date;
  onDateSelected: (date: Date | undefined) => void;
}

export const DatePicker = ({
  date,
  toDate,
  onDateSelected,
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          weekStartsOn={1}
          selected={date}
          onSelect={(date) => onDateSelected(date)}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
};
