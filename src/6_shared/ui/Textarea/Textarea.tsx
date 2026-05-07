import cn from "classnames";
import type { ChangeEvent, FocusEventHandler } from "react";
import styles from "./Textarea.module.scss";

export type TextareaProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: FocusEventHandler<HTMLTextAreaElement>;
    id?: string;
    invalid?: boolean;
    ariaDescribedBy?: string | undefined;
    maxLength?: number;
    rows?: number;
};

export function Textarea({
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    id,
    invalid = false,
    ariaDescribedBy,
    maxLength,
    rows = 4,
}: TextareaProps) {
    return (
        <textarea
            id={id}
            className={cn(styles["textarea"], invalid && styles["textarea-invalid"])}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            aria-invalid={invalid}
            aria-describedby={ariaDescribedBy}
            maxLength={maxLength}
            rows={rows}
        />
    );
}
