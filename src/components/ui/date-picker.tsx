import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";

type DatePickerFieldProps = {
  label: string;
  field: any;
  ariaLabel?: string;
};

export function DatePickerField({
  label,
  field,
  ariaLabel,
}: DatePickerFieldProps) {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              aria-label={ariaLabel}
              className={cn(
                "w-full flex flex-start font-normal bg-white dark:bg-black",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : "Pick a date"}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date) => {
              if (date) {
                const updatedDate = new Date(date);
                updatedDate.setHours(23, 59, 0, 0);
                field.onChange(updatedDate);
              }
            }}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
