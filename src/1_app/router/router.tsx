import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/app/layouts/MainLayout";
import { AboutUs } from "@/pages/AboutUs";
import {
    AccountLayout,
    AddressesPage,
    OrderDetailPage,
    OrdersPage,
    PersonalDetailsPage,
} from "@/pages/Account";
import { CartPage } from "@/pages/Cart";
import { Categories } from "@/pages/Categories";
import { CheckoutPage } from "@/pages/Checkout";
import { FavoritePage } from "@/pages/Favorite";
import { Home } from "@/pages/Home";
import {
    DeliveryPage,
    ProductReturnsPage,
    WarrantyPage,
} from "@/pages/Information";
import { LoginPage } from "@/pages/Login";

import { ProductCategory } from "@/pages/ProductCategory";
import { ProductDetail } from "@/pages/ProductDetail";

import { RegisterPage } from "@/pages/Register";
import { Wholesale } from "@/pages/Wholesale";
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
                path: "cart/checkout",
                element: <CheckoutPage />,
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
                path: "wholesale",
                element: <Wholesale />,
            },
            {
                path: "aboutus",
                element: <AboutUs />,
            },
            {
                path: "warranty",
                element: <WarrantyPage />,
            },
            {
                path: "delivery",
                element: <DeliveryPage />,
            },
            {
                path: "returns",
                element: <ProductReturnsPage />,
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
                        path: "orders/:orderId",
                        element: <OrderDetailPage />,
                    },
                    {
                        path: "addresses",
                        element: <AddressesPage />,
                    },
                ],
            },
        ],
    },
]);
