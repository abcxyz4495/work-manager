import type { Todo } from "@/types/types";
import { useCallback, useState } from "react";

export function useTodos(initialTodos: Todo[]) {
	const [todos, setTodosState] = useState<Todo[]>(initialTodos);

	const toggleTodo = useCallback((id: string) => {
		setTodosState((prev) =>
			prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
		);
	}, []);

	const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
		setTodosState((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)));
	}, []);

	const moveTodo = useCallback((oldIndex: number, newIndex: number) => {
		setTodosState((prevTodos) => {
			const newArray = [...prevTodos];
			const [removed] = newArray.splice(oldIndex, 1);
			if (removed) newArray.splice(newIndex, 0, removed);
			return newArray;
		});
	}, []);

	const addTodo = useCallback((newTodo: Todo) => {
		setTodosState((prev) => [...prev, newTodo]);
	}, []);

	const setTodos = useCallback((newTodos: Todo[]) => {
		setTodosState(newTodos);
	}, []);

	return { todos, toggleTodo, updateTodo, moveTodo, addTodo, setTodos };
}
