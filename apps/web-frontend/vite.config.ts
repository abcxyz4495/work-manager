import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
	plugins: [TanStackRouterVite(), viteReact()],
	resolve: {
		alias: {
			"@": `${__dirname}/src`,
		},
	},

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
	server: {
		port: 5173,
		strictPort: true,
		host: false,
		hmr: undefined,
		watch: {},
	},
}));
