import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [
		TanStackRouterVite(),
		viteReact(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"), // Fix alias path
		},
	},

	// Vite options tailored for Tauri development
	build: {
		outDir: "dist", // Ensure the build output goes to the dist folder
		target: "esnext", // Default target for modern browsers (you can adjust this for compatibility)
		sourcemap: true, // Enable sourcemaps for debugging
	},

	// Prevent Vite from clearing the terminal screen on build
	clearScreen: false,

	// Server configuration tailored for Tauri
	server: {
		port: 5173,
		strictPort: true,
		host: false,
		hmr: undefined, // Disable HMR if you don’t need it for Tauri
		watch: {
			usePolling: true, // Adjust for certain environments (like Docker or virtualized environments)
		},
	},
}));
