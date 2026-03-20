import type { ChangeEvent } from "react";
import styles from "./Input.module.css";

export type InputProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ name, placeholder, value, onChange }: InputProps) {
    return (
        <input
            className={styles["input"]}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}
