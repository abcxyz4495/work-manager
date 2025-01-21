import { EditableInput } from "@/components/custom/EditableInput";
import { TodoItem } from "@/components/custom/TodoItem";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/useTodos";
import type { Todo } from "@/types/types";
import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
	type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

const initialTodos = [
	{
		id: "1",
		title: "10 page of Reasoning",
		description: "Solve questions on Reasoning",
		completed: false,
		date: "3 Jan",
		priority: "p1" as const,
		project: "Project 1",
	},
	{
		id: "2",
		title: "Probability One shot",
		description: "Solve questions on probability",
		completed: false,
		date: "Yesterday",
		priority: "p2" as const,
		project: "Project 1",
	},
	{
		id: "3",
		title: "Solve questions on probability",
		completed: false,
		date: "Yesterday",
		priority: "p3" as const,
		project: "Project 2",
	},
	{
		id: "4",
		title: "Walk the dog",
		completed: false,
		date: "Yesterday",
		priority: "p4" as const,
		project: "Project 2",
	},
	{
		id: "5",
		title: "Play with my cat",
		completed: false,
		date: "Yesterday",
		priority: "none" as const,
		project: "Project 1",
	},
];

function InboxPage() {
	const { todos, toggleTodo, updateTodo, moveTodo, addTodo } = useTodos(initialTodos);
	const sensors = useSensors(useSensor(PointerSensor));
	const [isAddingTodo, setIsAddingTodo] = useState(false);
	const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = todos.findIndex((todo) => todo.id === active.id);
		const newIndex = todos.findIndex((todo) => todo.id === over.id);
		moveTodo(oldIndex, newIndex);
	};

	const handleStartEditing = (id: string) => {
		setEditingTodoId(id);
		setIsAddingTodo(false);
	};

	const handleCancelEditing = () => {
		setEditingTodoId(null);
	};

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold pl-10">Inbox</h1>
				<Button
					onClick={() => {
						setIsAddingTodo(true);
						setEditingTodoId(null);
					}}
				>
					Add Todo
				</Button>
			</div>

			{isAddingTodo && (
				<EditableInput
					initialValue=""
					initialDescription=""
					initialDate={new Date()}
					initialPriority="none"
					initialProject=""
					onSave={(title, description, date, priority, project) => {
						const newTodo: Todo = {
							id: Date.now().toString(),
							title,
							description,
							completed: false,
							date: date ? date.toLocaleDateString() : "",
							priority: priority as Todo["priority"],
							project,
						};
						addTodo(newTodo);
						setIsAddingTodo(false);
					}}
					onCancel={() => setIsAddingTodo(false)}
					isOpen={true}
				/>
			)}

			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
					<div className="flex flex-col gap-2">
						{todos.map((todo) => (
							<TodoItem
								key={todo.id}
								todo={todo}
								isEditing={editingTodoId === todo.id}
								onToggle={toggleTodo}
								onUpdate={updateTodo}
								onStartEditing={handleStartEditing}
								onCancelEditing={handleCancelEditing}
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
