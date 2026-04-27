import cn from "classnames";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import { Typography } from "@/shared/ui/Typography";
import type { FilterSection } from "../model/FilterProducts";
import { FilterPriceRange } from "./FilterPriceRange";
import styles from "./FilterProducts.module.scss";

type FilterProductsSectionProps = {
    section: FilterSection;
    isOpen: boolean;
    onToggle: () => void;
};

export function FilterProductsSection({
    section,
    isOpen,
    onToggle,
}: FilterProductsSectionProps) {
    return (
        <div className={styles["filter-item"]}>
            <div className={styles["text-wrapper"]} onClick={onToggle}>
                <Typography variant="body-s">
                    {section.title}
                    {section.titleCount != null && (
                        <span> ({section.titleCount}) </span>
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
                    [styles["list--tags"]]: section.variant === "tags",
                    [styles["list--price"]]: section.variant === "priceRange",
                })}
            >
                {section.variant === "priceRange" && section.priceRange ? (
                    <FilterPriceRange config={section.priceRange} />
                ) : section.variant === "tags" ? (
                    section.options.map((row) => (
                        <button
                            key={row.key}
                            type="button"
                            className={cn(styles["tag-pill"], {
                                [styles["tag-pill--active"]]: row.checked,
                            })}
                            onClick={row.onChange}
                        >
                            #{row.label}
                        </button>
                    ))
                ) : (
                    section.options.map((row) => (
                        <label
                            key={row.key}
                            className={cn(
                                styles["label"],
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
                    ))
                )}
            </div>
        </div>
    );
}
