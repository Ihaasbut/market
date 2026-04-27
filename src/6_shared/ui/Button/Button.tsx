import cn from "classnames";
import type { ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
    variant: "fill" | "outside" | "filter";
    children: ReactNode;
    onclick?: () => void;
    type?: "button" | "submit" | "reset";
};

export function Button({
    variant,
    children,
    onclick,
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(styles["button"], styles[`button-${variant}`])}
            onClick={onclick}
        >
            {children}
        </button>
    );
}
