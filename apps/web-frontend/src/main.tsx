import React from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/context/theme-provider";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css"; // Make sure this file exists for global styles
import { routeTree } from "./routeTree.gen"; // Your routes configuration

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Service worker registration
serviceWorkerRegistration.register();

// Render the root element
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite:ui:theme">
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
