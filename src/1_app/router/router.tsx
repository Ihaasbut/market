import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { Categories } from "@/pages/Categories";
import { Home } from "@/pages/Home";
import { Test } from "@/pages/Test/ui/test";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: `/product/:id`,
                element: <Test />,
            },
            {
                path: `/categories`,
                element: <Categories />,
            },
            {
                path: `/category/:slug`,
                element: <Test />,
            },
        ],
    },
]);
