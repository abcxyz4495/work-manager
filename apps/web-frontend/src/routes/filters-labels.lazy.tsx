import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/filters-labels")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/filters-labels"!</div>;
}
