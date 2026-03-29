import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { Categories } from "@/pages/Categories";
import { Home } from "@/pages/Home";

import { ProductCategory } from "@/entities/products/ProductCategory";
import { ProductDetail } from "@/entities/products/ProductDetail";



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
                path: `product/:id`,
                element: <ProductDetail />,
            },
            {
                path: `categories`,
                element: <Categories />,
            },
            {
                path: `categories/:slug`,
                element: <ProductCategory />,
            },
        ],
    },
]);
