import { DueDate } from "@/components/custom/DueDate";
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

interface Todo {
	id: string;
	title: string;
	completed: boolean;
	date: string;
	priority: "p1" | "p2" | "p3" | "p4" | "none";
}

export const Route = createLazyFileRoute("/inbox")({
	component: InboxPage,
});

function InboxPage() {
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

	const sensors = useSensors(useSensor(PointerSensor));

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
								onToggle={() => toggleTodo(todo.id)}
								onUpdate={(id, updates) => {
									setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
								}}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>
		</div>
	);
}

function TodoItem({
	todo,
	onToggle,
	onUpdate,
}: {
	todo: Todo;
	onToggle: () => void;
	onUpdate: (id: string, updates: Partial<Todo>) => void;
}) {
	const [isEditing, setIsEditing] = useState(false);
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: todo.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 1 : 0,
		position: "relative" as const,
	};

	if (isEditing) {
		return (
			<EditableInput
				initialValue={todo.title}
				isOpen={isEditing}
				onSave={(newValue) => {
					onUpdate(todo.id, { title: newValue });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="relative">
			<div
				ref={setNodeRef}
				style={style}
				className={cn(
					"group flex w-full items-center gap-3 py-1 bg-card transition-colors pb-2",
					todo.completed && "opacity-60",
					isDragging && "shadow-lg bg-background",
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
						onClick={(e) => {
							e.stopPropagation();
							onToggle();
						}}
						className="flex h-5 w-5 items-center justify-center rounded-full border"
					>
						{todo.completed ? (
							<CheckCircle
								className={cn(
									"h-4 w-4",
									todo.priority === "p1" && "text-red-500",
									todo.priority === "p2" && "text-orange-500",
									todo.priority === "p3" && "text-amber-400",
									todo.priority === "p4" && "text-blue-600",
									todo.priority === "none" && "text-success",
								)}
							/>
						) : (
							<Circle
								className={cn(
									"h-4 w-4",
									todo.priority === "p1" && "text-red-500",
									todo.priority === "p2" && "text-orange-500",
									todo.priority === "p3" && "text-amber-400",
									todo.priority === "p4" && "text-blue-600",
									todo.priority === "none" && "text-muted-foreground",
								)}
							/>
						)}
					</button>
				</div>
				<div className="flex flex-1 flex-col gap-1">
					<span className={cn("text-sm", todo.completed && "line-through")}>{todo.title}</span>
					<span className="text-xs text-muted-foreground flex items-center gap-1">
						<Calendar className="h-4 w-4" />
						{todo.date}
					</span>
				</div>
				<div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
					<Hint label="Edit">
						<Button
							variant="ghost"
							size="icon"
							className="hover:bg-accent rounded-md text-muted-foreground hover:text-foreground"
							onClick={() => setIsEditing(true)}
						>
							<Pen className="h-4 w-4" />
						</Button>
					</Hint>
					<DueDate />
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

function arrayMove<T>(array: T[], from: number, to: number) {
	const newArray = array.slice();
	newArray.splice(to, 0, newArray.splice(from, 1)[0]);
	return newArray;
}
