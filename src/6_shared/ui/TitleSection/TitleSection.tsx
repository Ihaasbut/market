import cn from "classnames"
import type { ReactNode } from "react";
import { Typography } from "../Typography";
import styles from "./TitleSection.module.scss";

export type TitleSectionProps = {
    children: ReactNode;
    className?: string;
};

export function TitleSection({ children, className }: TitleSectionProps) {
    return (
        <Typography variant={"h2"} as="h2" className={cn(styles["title-section"], className)}>
            {children}
        </Typography>
    );
}
