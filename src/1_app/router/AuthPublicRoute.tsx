import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectAuthUser } from "@/features/auth";
import { useAppSelector } from "@/shared/store";

type AuthPublicRouteProps = {
    children: ReactNode;
};

export function AuthPublicRoute({ children }: AuthPublicRouteProps) {
    const user = useAppSelector((state) => selectAuthUser(state.auth));

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
}
