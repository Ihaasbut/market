import type { ReactNode } from "react";
import { Typography } from "@/shared/ui/Typography";
import styles from "./AuthFormShell.module.scss";

type AuthFormShellProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer: ReactNode;
};

export function AuthFormShell({
    title,
    subtitle,
    children,
    footer,
}: AuthFormShellProps) {
    return (
        <div className="container">
            <main className={styles["page"]}>
                <div className={styles["card"]}>
                    <div className={styles["header"]}>
                        <Typography variant="h4" as="h1">
                            {title}
                        </Typography>
                        <Typography
                            variant="body-s"
                            as="p"
                            className={styles["subtitle"]}
                        >
                            {subtitle}
                        </Typography>
                    </div>
                    <div className={styles["body"]}>{children}</div>
                    {footer}
                </div>
            </main>
        </div>
    );
}
