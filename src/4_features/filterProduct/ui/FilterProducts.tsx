import cn from "classnames";
import { useState } from "react";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import type { FilterProductsProps } from "../model/FilterProducts";
import styles from "./FilterProducts.module.css";

export function FilterProducts({
    sections,
    onResetFilters,
}: FilterProductsProps) {
    const [openById, setOpenById] = useState<Record<string, boolean>>({});

    const toggleSection = (id: string) => {
        setOpenById((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className={styles["filter-wrapper"]}>
            <div className={styles["filter"]}>
                <Typography variant="body-l">Filters</Typography>
                {sections.map((section) => {
                    const isOpen = Boolean(openById[section.id]);
                    return (
                        <div
                            key={section.id}
                            className={styles["filter-item"]}
                        >
                            <div
                                className={styles["text-wrapper"]}
                                onClick={() => toggleSection(section.id)}
                            >
                                <Typography variant="body-s">
                                    {section.title}
                                    {section.titleCount != null && (
                                        <span>
                                            {" "}
                                            ({section.titleCount}){" "}
                                        </span>
                                    )}
                                </Typography>
                                <div
                                    className={cn(styles["arrow-bottom"], {
                                        [styles["open"]]: isOpen,
                                    })}
                                >
                                    <ArrowBottom />
                                </div>
                            </div>
                            <div
                                className={cn(styles["list"], {
                                    [styles["open"]]: isOpen,
                                })}
                            >
                                {section.options.map((row) => (
                                    <label
                                        key={row.key}
                                        className={cn(
                                            styles.label,
                                            styles["label-stock"],
                                        )}
                                    >
                                        <input
                                            type="checkbox"
                                            className={styles["checkbox"]}
                                            checked={row.checked}
                                            onChange={row.onChange}
                                        />
                                        <Typography variant="body-xs">
                                            {row.label}
                                        </Typography>
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <Button variant="fill" onclick={onResetFilters}>
                Reset filters
            </Button>
        </div>
    );
}

export default FilterProducts;
