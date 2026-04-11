import cn from "classnames";
import styles from "./Typography.module.scss";
import type { TypographyPropsI } from "./typography.types";

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
