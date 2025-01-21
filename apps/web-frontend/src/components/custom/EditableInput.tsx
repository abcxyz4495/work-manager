import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DatePicker } from "./DatePicker";

interface EditableInputProps {
	initialValue: string;
	initialDescription: string;
	initialDate: Date;
	initialPriority: string;
	initialProject: string;
	onSave: (
		value: string,
		description: string,
		date: Date | undefined,
		priority: string,
		project: string,
	) => void;
	onCancel: () => void;
	isOpen: boolean;
}

export const EditableInput = ({
	initialValue,
	initialDescription,
	initialDate,
	initialPriority,
	initialProject,
	onSave,
	onCancel,
	isOpen,
}: EditableInputProps) => {
	const [value, setValue] = useState(initialValue);
	const [description, setDescription] = useState(initialDescription);
	const [date, setDate] = useState<Date | undefined>(initialDate);
	const [priority, setPriority] = useState(initialPriority);
	const [project, setProject] = useState(initialProject);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	const handleSave = () => {
		onSave(value, description, date, priority, project);
	};

	return (
		<div className={cn("bg-background border rounded-lg shadow-sm", !isOpen && "hidden")}>
			<div className="p-4 gap-2 flex flex-col">
				<Input
					ref={inputRef}
					value={value}
					placeholder="Add a todo"
					onChange={(e) => setValue(e.target.value)}
					className="resize-none"
				/>
				<Input
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="text-sm"
				/>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1">
						<DatePicker selected={date} onSelect={(newDate) => setDate(newDate)} />
						<Select value={priority} onValueChange={setPriority}>
							<SelectTrigger className="w-[100px]">
								<SelectValue placeholder="Priority" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="p1">P1</SelectItem>
								<SelectItem value="p2">P2</SelectItem>
								<SelectItem value="p3">P3</SelectItem>
								<SelectItem value="p4">P4</SelectItem>
								<SelectItem value="none">None</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-between border-t p-4">
				<Select value={project} onValueChange={setProject}>
					<SelectTrigger className="w-[150px]">
						<SelectValue placeholder="Select a project" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="Project 1">Project 1</SelectItem>
						<SelectItem value="Project 2">Project 2</SelectItem>
					</SelectContent>
				</Select>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={onCancel}
						className="h-8 text-muted-foreground hover:text-foreground"
					>
						Cancel
					</Button>
					<Button size="sm" onClick={handleSave} className="h-8">
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};
