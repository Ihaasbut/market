import cn from "classnames";
import { useState } from "react";
import ArrowSelect from "@/shared/assets/icon/ArrowSelect";
import { Typography } from "../Typography";

import styles from "./Select.module.css";

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

    const openOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles[`select-custom-${variant}`]}>
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
                                setIsOpen(!isOpen);
                                onChange(option.name);
                            }}
                            className={cn(styles.option, {
                                [styles.active]: activeOption === option.name,
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
