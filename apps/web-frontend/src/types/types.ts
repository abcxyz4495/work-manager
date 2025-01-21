export interface Todo {
	id: string;
	title: string;
	description?: string;
	completed: boolean;
	date: string;
	priority: "p1" | "p2" | "p3" | "p4" | "none";
	project: string;
}

export const PRIORITY_COLORS: Record<Todo["priority"], string> = {
	p1: "text-red-500",
	p2: "text-orange-500",
	p3: "text-amber-400",
	p4: "text-blue-600",
	none: "text-success",
};
