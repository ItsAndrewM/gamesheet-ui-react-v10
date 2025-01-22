import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { peerDependencies } from "./package.json";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        preserveSymlinks: true,
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "styled-components": path.resolve(__dirname, "node_modules/styled-components"),
        },
    },
    esbuild: {
        // This will affect type checking during build
        logOverride: { "this-is-undefined-in-esm": "silent" },
    },
    build: {
        lib: {
            entry: "./src/index.tsx", // Specifies the entry point for building the library.
            name: "gamesheet-ui-react-v10", // Sets the name of the generated library.
            fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
            formats: ["cjs", "es"], // Specifies the output formats (CommonJS and ES modules).
        },
        rollupOptions: {
            external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
        },
        sourcemap: true, // Generates source maps for debugging.
        emptyOutDir: true, // Clears the output directory before building.
    },
    plugins: [react()],
});
