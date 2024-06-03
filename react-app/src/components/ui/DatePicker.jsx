import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({onDateChange, variant}) {
    const [date, setDate] = useState();

    
    const handleDateChange = (newDate) => {
        setDate(new Date(newDate));
        let localDate = new Date(newDate);
        let dateWithoutTimezone = new Date(Date.UTC(localDate.getFullYear(), localDate.getMonth(), localDate.getDate()));
        console.log(dateWithoutTimezone.toISOString().split("T")[0]);
        onDateChange(dateWithoutTimezone.toISOString().split("T")[0]);
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={variant}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span className="">Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
