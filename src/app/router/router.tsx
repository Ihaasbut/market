import { createBrowserRouter } from "react-router-dom";
import { Test } from "@/pages/test";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Test />,
            },
            {
                path: "/test",
                element: <Test />,
            },
        ],
    },
]);
