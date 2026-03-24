import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    resolve: {
        // Make `compilerOptions.baseUrl` + `compilerOptions.paths` work in Vite
        tsconfigPaths: true,
    },
    server: {
        allowedHosts: ["compatibly-prosperous-emperor.cloudpub.ru"],
    },
});
