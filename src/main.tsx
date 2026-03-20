import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./6_shared/styles/colors.css";
import "./6_shared/styles/fonts.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./1_app/router/router";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
