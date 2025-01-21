import { DatePicker } from "@/components/custom/DatePicker";
import { EditableInput } from "@/components/custom/EditableInput";
import { Hint } from "@/components/custom/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Todo, PRIORITY_COLORS } from "@/types/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
	Calendar,
	CheckCircle,
	Circle,
	GripVertical,
	MessageSquare,
	MoreVertical,
	Pen,
} from "lucide-react";

interface TodoItemProps {
	todo: Todo;
	isEditing: boolean;
	onToggle: (id: string) => void;
	onUpdate: (id: string, updates: Partial<Todo>) => void;
	onStartEditing: (id: string) => void;
	onCancelEditing: () => void;
}

export function TodoItem({
	todo,
	isEditing,
	onToggle,
	onUpdate,
	onStartEditing,
	onCancelEditing,
}: TodoItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		setActivatorNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: todo.id,
	});

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : undefined,
	};

	if (isEditing) {
		return (
			<div ref={setNodeRef} style={style}>
				<EditableInput
					initialValue={todo.title}
					initialDescription={todo.description || ""}
					initialDate={todo.date ? new Date(todo.date) : new Date()}
					initialPriority={todo.priority}
					initialProject={todo.project || ""}
					isOpen={true}
					onSave={(title, description, date, priority, project) => {
						onUpdate(todo.id, {
							title,
							description,
							date: date ? date.toISOString().split("T")[0] : "",
							priority: priority as Todo["priority"],
							project,
						});
						onCancelEditing();
					}}
					onCancel={onCancelEditing}
				/>
			</div>
		);
	}

	return (
		<div ref={setNodeRef} style={style}>
			<div className="bg-background rounded-lg shadow-sm">
				<div
					className={cn(
						"group flex w-full items-start gap-3 py-1 bg-card transition-colors pb-2",
						todo.completed && "opacity-60",
						isDragging && "shadow-lg bg-background min-h-16",
						"flex-none",
					)}
				>
					<div
						{...attributes}
						{...listeners}
						className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing px-2"
					>
						<GripVertical className="h-4 w-4 text-muted-foreground" />
					</div>

					<div className="flex items-center gap-2">
						<button
							onClick={() => onToggle(todo.id)}
							className="flex h-5 w-5 items-center justify-center rounded-full border"
						>
							{todo.completed ? (
								<CheckCircle className={cn("h-4 w-4", PRIORITY_COLORS[todo.priority])} />
							) : (
								<Circle className={cn("h-4 w-4", PRIORITY_COLORS[todo.priority])} />
							)}
						</button>
					</div>

					<div className="flex flex-1 flex-col gap-1">
						<div className="flex flex-col">
							<span className={cn("text-sm", todo.completed && "line-through")}>{todo.title}</span>
							<div className="flex flex-col gap-1 text-xs text-muted-foreground">
								{todo.description && (
									<div>
										<span className="text-muted-foreground">{todo.description}</span>
									</div>
								)}
								<div className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									<span>{todo.date}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
						<Hint label="Edit">
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
								onClick={() => onStartEditing(todo.id)}
							>
								<Pen className="h-4 w-4" />
							</Button>
						</Hint>
						<DatePicker
							onSelect={(date) => onUpdate(todo.id, { date: date.toLocaleDateString() })}
						/>
						<Hint label="Comment">
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
							>
								<MessageSquare className="h-4 w-4" />
							</Button>
						</Hint>
						<Hint label="More actions">
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
							>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</Hint>
					</div>
				</div>
			</div>
		</div>
	);
}
