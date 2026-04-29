import cn from "classnames";
import type { ChangeEvent } from "react";
import styles from "./Input.module.scss";

export type InputProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    type?: HTMLInputElement["type"];
    invalid?: boolean;
    readOnly?: boolean;
};

export function Input({
    name,
    placeholder,
    value,
    onChange,
    id,
    type = "text",
    invalid = false,
    readOnly = false,
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
            readOnly={readOnly}
            aria-invalid={invalid}
        />
    );
}
