import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/upcoming")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/upcoming"!</div>;
}
