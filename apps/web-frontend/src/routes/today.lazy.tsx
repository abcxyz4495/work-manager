import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/today")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/today"!</div>;
}
