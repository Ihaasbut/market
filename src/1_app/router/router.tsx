import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import {
    AccountLayout,
    AddressesPage,
    OrdersPage,
    PaymentMethodsPage,
    PersonalDetailsPage,
} from "@/pages/Account";
import { CartPage } from "@/pages/Cart";
import { Categories } from "@/pages/Categories";
import { FavoritePage } from "@/pages/Favorite";
import { Home } from "@/pages/Home";
import { LoginPage } from "@/pages/Login";

import { ProductCategory } from "@/pages/ProductCategory";
import { ProductDetail } from "@/pages/ProductDetail";

import { RegisterPage } from "@/pages/Register";
import { AuthPublicRoute } from "./AuthPublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <AuthPublicRoute>
                <LoginPage />
            </AuthPublicRoute>
        ),
    },
    {
        path: "/register",
        element: (
            <AuthPublicRoute>
                <RegisterPage />
            </AuthPublicRoute>
        ),
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "product/:id",
                element: <ProductDetail />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
            {
                path: "favorites",
                element: <FavoritePage />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "categories/:slug",
                element: <ProductCategory />,
            },
            {
                path: "account",
                element: <AccountLayout />,
                children: [
                    {
                        index: true,
                        element: <PersonalDetailsPage />,
                    },
                    {
                        path: "orders",
                        element: <OrdersPage />,
                    },
                    {
                        path: "addresses",
                        element: <AddressesPage />,
                    },
                    {
                        path: "payment",
                        element: <PaymentMethodsPage />,
                    },
                ],
            },
        ],
    },
]);
