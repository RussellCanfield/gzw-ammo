import { resolve } from "node:path";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
	base:
		process.env.NODE_ENV === "production"
			? "https://gzw-ammo-analyzer.pages.dev/"
			: "",
	plugins: [
		react(),
		tailwindcss(),
		federation({
			name: "host",
			manifest: true,
			remotes: {
				ammo_analyzer: {
					type: "module",
					name: "ammo_analyzer",
					entry: "https://gzw-ammo-analyzer-remote.pages.dev/remoteEntry.js",
					entryGlobalName: "ammo_analyzer",
					shareScope: "default",
				},
			},
			exposes: {
				"./App": "./src/App.tsx",
			},
			shared: {
				react: {
					requiredVersion: dependencies.react,
					singleton: true,
				},
				"react-dom": {
					requiredVersion: dependencies["react-dom"],
					singleton: true,
				},
			},
		}),
	],
	build: {
		target: "chrome89",
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: resolve(__dirname, "src/main.tsx"),
				index: resolve(__dirname, "index.html"),
			},
		},
	},
});
