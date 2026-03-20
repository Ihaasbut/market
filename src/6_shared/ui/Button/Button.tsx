import cn from "classnames";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    variant: "fill" | "outside" | "filter";
    children: ReactNode;
    onclick?: () => void;
};

export function Button({ variant, children, onclick }: ButtonProps) {
    return (
        <button
            className={cn(styles["button"], styles[`button-${variant}`])}
            onClick={onclick}
        >
            {children}
        </button>
    );
}
