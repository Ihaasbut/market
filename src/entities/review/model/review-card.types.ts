import type { ReactNode } from "react";

export type ReviewCardProps = {
    firstName: string;
    secondName: string;
    date: string;
    rating: number;
    text: string;
    actions?: ReactNode;
    footer?: ReactNode;
};