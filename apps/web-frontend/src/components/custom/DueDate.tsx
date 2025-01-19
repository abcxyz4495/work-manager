import { Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DatePicker } from "./DatePicker";
import { Hint } from "./Hint";

export const DueDate = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<Hint label="Due date">
					<Button
						variant="ghost"
						size="icon"
						className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
					>
						<Calendar className="h-4 w-4" />
					</Button>
				</Hint>
			</PopoverTrigger>
			<PopoverContent>
				<DatePicker />
			</PopoverContent>
		</Popover>
	);
};
