import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import ArrowSelect from "@/shared/assets/icon/ArrowSelect";
import { Typography } from "../Typography";

import styles from "./Select.module.scss";

export type SelectOption = {
    id: number;
    name: string;
};

export type SelectProps = {
    options: SelectOption[];
    onChange: (value: string) => void;
    activeOption: string;
    variant: "cardProduct" | "cardFilter" | "cartOrder";
    label?: string;
};

export function Select({
    options,
    onChange,
    activeOption,
    variant,
    label,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const node = rootRef.current;
            if (!node || node.contains(event.target as Node)) {
                return;
            }
            setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);
        return () =>
            document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    const openOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            ref={rootRef}
            className={styles[`select-custom-${variant}`]}
        >
            {label && (
                <Typography variant="body-xs" className={styles["label"]}>{label}</Typography>
            )}
            <div className={styles["value-select"]} onClick={openOptions}>
                <Typography variant="body-s">{activeOption} </Typography>
                <div
                    className={cn(styles["arrow-select"], {
                        [styles["active"]]: isOpen,
                    })}
                >
                    <ArrowSelect />
                </div>
            </div>

            {isOpen && (
                <ul className={styles["options"]}>
                    {options.map((option) => (
                        <li
                            key={option.id}
                            onClick={() => {
                                setIsOpen(false);
                                onChange(option.name);
                            }}
                            className={cn(styles["option"], {
                                [styles["active"]]: activeOption === option.name,
                            })}
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
