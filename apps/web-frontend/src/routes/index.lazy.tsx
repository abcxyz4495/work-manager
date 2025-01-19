import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="h-full w-full">
			<div className="container h-full mx-auto px-4 py-8 flex justify-center items-center">
				<h1 className="text-3xl font-light mb-4">Todo App</h1>
			</div>
		</div>
	);
}
