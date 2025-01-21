import { useState, useCallback } from "react";
import type { Todo } from "@/types/types";

export function useTodos(initialTodos: Todo[]) {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
		);
	}, []);

	const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
		setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)));
	}, []);

	const moveTodo = useCallback((oldIndex: number, newIndex: number) => {
		setTodos((items) => {
			const newArray = [...items];
			const [removed] = newArray.splice(oldIndex, 1);
			if (removed) newArray.splice(newIndex, 0, removed);
			return newArray;
		});
	}, []);

	const addTodo = useCallback((newTodo: Todo) => {
		setTodos((prev) => [...prev, newTodo]);
	}, []);

	return { todos, toggleTodo, updateTodo, moveTodo, addTodo };
}
