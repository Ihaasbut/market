import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./6_shared/styles/colors.css";
import "./6_shared/styles/fonts.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./1_app/router/router";
import { store } from "./1_app/store/store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
