import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/context/theme-provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite:ui:theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
