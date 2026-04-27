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
        // WSL / LAN: слушать все интерфейсы (если заходите с Windows на IP WSL)
        host: true,
        // Без localhost HMR (vite connect) ломается при открытии с 127.0.0.1 / localhost
        allowedHosts: [
            "localhost",
            ".localhost",
            "127.0.0.1",
            "compatibly-prosperous-emperor.cloudpub.ru",
        ],
    },
});
