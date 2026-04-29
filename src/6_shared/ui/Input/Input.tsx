import cn from "classnames";
import type { ChangeEvent, FocusEventHandler } from "react";
import styles from "./Input.module.scss";

export type InputProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    id?: string;
    type?: HTMLInputElement["type"];
    invalid?: boolean;
    /** Connects validation message element for accessibility */
    ariaDescribedBy?: string | undefined;
};

export function Input({
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    id,
    type = "text",
    invalid = false,
    ariaDescribedBy,
}: InputProps) {
    return (
        <input
            id={id}
            className={cn(styles["input"], invalid && styles["input-invalid"])}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={invalid}
            aria-describedby={ariaDescribedBy}
        />
    );
}
