import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectAuthUser } from "@/features/auth";
import { useAppSelector } from "@/shared/store";

type ProtectedRouteProps = {
    children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useAppSelector((state) => selectAuthUser(state.auth));

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
