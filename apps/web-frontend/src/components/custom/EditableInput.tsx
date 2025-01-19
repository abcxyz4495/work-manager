import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DatePicker } from "./DatePicker";

interface EditableInputProps {
	initialValue: string;
	onSave: (value: string) => void;
	onCancel: () => void;
	isOpen: boolean;
}

export const EditableInput = ({ initialValue, onSave, onCancel, isOpen }: EditableInputProps) => {
	const [value, setValue] = useState(initialValue);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handlePriorityChange = () => { };

	return (
		<div className="relative">
			<div
				className={cn(
					"absolute left-0 top-0 w-full bg-background rounded-lg shadow-lg border z-[100]",
					!isOpen && "hidden",
				)}
			>
				<div className="p-4 gap-2 flex flex-col">
					<Input
						ref={inputRef}
						value={value}
						placeholder="Add a todo"
						onChange={(e) => setValue(e.target.value)}
						className="resize-none"
					/>
					<Input placeholder="Description" className="text-sm" />
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-1">
							<DatePicker />
							<Button variant="ghost" size="icon" className="h-8 w-8">
								<Flag className="h-4 w-4" onClick={handlePriorityChange} />
							</Button>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between border-t p-4">
					<div>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Select a project" />
							</SelectTrigger>
							<SelectContent className="z-[300]">
								<SelectItem value="1">Project 1</SelectItem>
								<SelectItem value="2">Project 2</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={onCancel}
							className="h-8 text-muted-foreground hover:text-foreground"
						>
							Cancel
						</Button>
						<Button size="sm" onClick={() => onSave(value)} className="h-8">
							Save
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
