import type { ReactNode } from "react";
import { Typography } from "../Typography";
import styles from "./TitleSection.module.css";

export type TitleSectionProps = {
    children: ReactNode;
};

export function TitleSection({ children }: TitleSectionProps) {
    return (
        <Typography variant={"h2"} as="h2" className={styles["title-section"]}>
            {children}
        </Typography>
    );
}
