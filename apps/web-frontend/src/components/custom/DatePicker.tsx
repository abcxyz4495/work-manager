import { getMonth, getYear, setMonth, setYear } from "date-fns";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
	startYear?: number;
	endYear?: number;
	selected?: Date;
	onSelect?: (date: Date) => void;
}

export function DatePicker({
	startYear = getYear(new Date()) - 100,
	endYear = getYear(new Date()) + 100,
	selected,
	onSelect,
}: DatePickerProps) {
	const [date, setDate] = React.useState<Date>(selected || new Date());

	React.useEffect(() => {
		if (selected) {
			setDate(selected);
		}
	}, [selected]);

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

	const handleMonthChange = (month: string) => {
		const newDate = setMonth(date, months.indexOf(month));
		setDate(newDate);
		onSelect?.(newDate);
	};

	const handleYearChange = (year: string) => {
		const newDate = setYear(date, Number.parseInt(year));
		setDate(newDate);
		onSelect?.(newDate);
	};

	const handleSelect = (selectedDate: Date | undefined) => {
		if (selectedDate) {
			setDate(selectedDate);
			onSelect?.(selectedDate);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"ghost"}
					className={cn("justify-center text-left font-normal", !date && "text-muted-foreground")}
				>
					<CalendarIcon className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 z-[200]">
				<div className="flex justify-between p-2">
					<Select onValueChange={handleMonthChange} value={months[getMonth(date)]}>
						<SelectTrigger className="w-[110px]">
							<SelectValue placeholder="Month" />
						</SelectTrigger>
						<SelectContent className="z-[300]">
							{months.map((month) => (
								<SelectItem key={month} value={month}>
									{month}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select onValueChange={handleYearChange} value={getYear(date).toString()}>
						<SelectTrigger className="w-[110px]">
							<SelectValue placeholder="Year" />
						</SelectTrigger>
						<SelectContent className="z-[300]">
							{years.map((year) => (
								<SelectItem key={year} value={year.toString()}>
									{year}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelect}
					initialFocus
					month={date}
					onMonthChange={setDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
