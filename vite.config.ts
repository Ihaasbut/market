import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
const scssHoverMixin = `@mixin hover {
    @media (hover: hover) {
        @content;
    }
}
`;

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: scssHoverMixin,
            },
        },
    },
    resolve: {
        // Make `compilerOptions.baseUrl` + `compilerOptions.paths` work in Vite
        tsconfigPaths: true,
    },
    server: {
        allowedHosts: ["compatibly-prosperous-emperor.cloudpub.ru"],
    },
});
