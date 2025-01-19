import { DatePicker } from "@/components/custom/DatePicker";
import { EditableInput } from "@/components/custom/EditableInput";
import { Hint } from "@/components/custom/Hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
	Calendar,
	CheckCircle,
	Circle,
	GripVertical,
	MessageSquare,
	MoreVertical,
	Pen,
} from "lucide-react";
import { useState } from "react";

// Types
interface Todo {
	id: string;
	title: string;
	completed: boolean;
	date: string;
	priority: "p1" | "p2" | "p3" | "p4" | "none";
}

// Priority color mapping
const PRIORITY_COLORS: Record<Todo["priority"], string> = {
	p1: "text-red-500",
	p2: "text-orange-500",
	p3: "text-amber-400",
	p4: "text-blue-600",
	none: "text-success",
};

// Helper function to move array items
function arrayMove<T>(array: T[], from: number, to: number): T[] {
	const newArray = array.slice();
	const [removed] = newArray.splice(from, 1);
	if (removed !== undefined) {
		newArray.splice(to, 0, removed);
	}
	return newArray;
}

// TodoItem Component
interface TodoItemProps {
	todo: Todo;
	isEditing: boolean;
	onToggle: () => void;
	onUpdate: (id: string, updates: Partial<Todo>) => void;
	onStartEditing: () => void;
	onCancelEditing: () => void;
}

function TodoItem({
	todo,
	isEditing,
	onToggle,
	onUpdate,
	onStartEditing,
	onCancelEditing,
}: TodoItemProps) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: todo.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	// Render EditableInput when in edit mode
	if (isEditing) {
		return (
			<div ref={setNodeRef} style={style}>
				<EditableInput
					initialValue={todo.title}
					isOpen={true}
					onSave={(newValue) => {
						onUpdate(todo.id, { title: newValue });
						onCancelEditing();
					}}
					onCancel={onCancelEditing}
				/>
			</div>
		);
	}

	// Regular todo item view
	return (
		<div ref={setNodeRef} style={style}>
			<div
				className={cn(
					"group flex w-full items-center gap-3 py-1 bg-card transition-colors pb-2",
					todo.completed && "opacity-60",
					isDragging && "shadow-lg bg-background",
				)}
			>
				{/* Drag Handle */}
				<div
					{...attributes}
					{...listeners}
					className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing px-2"
				>
					<GripVertical className="h-4 w-4 text-muted-foreground" />
				</div>

				{/* Checkbox */}
				<div className="flex items-center gap-2">
					<button
						onClick={(e) => {
							e.stopPropagation();
							onToggle();
						}}
						className="flex h-5 w-5 items-center justify-center rounded-full border"
					>
						{todo.completed ? (
							<CheckCircle className={cn("h-4 w-4", PRIORITY_COLORS[todo.priority])} />
						) : (
							<Circle className={cn("h-4 w-4", PRIORITY_COLORS[todo.priority])} />
						)}
					</button>
				</div>

				{/* Todo Content */}
				<div className="flex flex-1 flex-col gap-1">
					<span className={cn("text-sm", todo.completed && "line-through")}>{todo.title}</span>
					<span className="text-xs text-muted-foreground flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						{todo.date}
					</span>
				</div>

				{/* Actions */}
				<div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
					<Hint label="Edit">
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
							onClick={onStartEditing}
						>
							<Pen className="h-4 w-4" />
						</Button>
					</Hint>
					<DatePicker />
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
	);
}

// Main Page Component
function InboxPage() {
	// Initial todos state
	const [todos, setTodos] = useState<Todo[]>([
		{
			id: "1",
			title: "10 page of Reasoning",
			completed: false,
			date: "3 Jan",
			priority: "p1",
		},
		{
			id: "2",
			title: "Probability One shot",
			completed: false,
			date: "Yesterday",
			priority: "p2",
		},
		{
			id: "3",
			title: "Solve questions on probability",
			completed: false,
			date: "Yesterday",
			priority: "p3",
		},
		{
			id: "4",
			title: "Walk the dog",
			completed: false,
			date: "Yesterday",
			priority: "p4",
		},
		{
			id: "5",
			title: "Play with my cat",
			completed: false,
			date: "Yesterday",
			priority: "none",
		},
	]);

	// Editing state
	const [editingId, setEditingId] = useState<string | null>(null);

	// DnD sensors
	const sensors = useSensors(useSensor(PointerSensor));

	// Handlers
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		setTodos((items) => {
			const oldIndex = items.findIndex((i) => i.id === active.id);
			const newIndex = items.findIndex((i) => i.id === over.id);
			return arrayMove(items, oldIndex, newIndex);
		});
	};

	const toggleTodo = (id: string) => {
		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
		);
	};

	const updateTodo = (id: string, updates: Partial<Todo>) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)));
	};

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold pl-10">Inbox</h1>
			</div>

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-2">
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								isEditing={editingId === todo.id}
								onToggle={() => toggleTodo(todo.id)}
								onUpdate={updateTodo}
								onStartEditing={() => setEditingId(todo.id)}
								onCancelEditing={() => setEditingId(null)}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}

export const Route = createLazyFileRoute("/inbox")({
	component: InboxPage,
});
