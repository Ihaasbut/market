import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { Test } from "@/pages/test";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Test />,
            },
        ],
    },
]);
