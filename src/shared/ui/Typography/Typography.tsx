import styles from "./Typography.module.css";
import type { TypographyPropsI } from "./typography.types";
import cn from "classnames";

export function Typography({
    variant,
    children,
    className = "",
    as: Component = "p",
}: TypographyPropsI) {
    return (
        <Component
            variant={variant}
            className={cn(styles["typography"], styles[variant], className)}
        >
            {children}
        </Component>
    );
}
