/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		exclude: ["src/**/*.stories.{js,jsx,ts,tsx}", "node_modules/**"],
		globals: true,
		css: true,
		alias: {
			// Mock CSS modules
			"\\.module\\.(css|scss|sass)$": "./src/test/styleMock.js",
		},
	},
});
