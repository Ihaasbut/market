import cn from "classnames";
import { useState } from "react";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import {
    useFilterBrands,
    type FilterProductsProps,
} from "../model/FilterProducts";
import styles from "./FilterProducts.module.css";

export function FilterProducts({
    products,
    selectedBrands,
    onToggleBrand,
    inStock,
    onToggleInStock,
    onResetFilters,
}: FilterProductsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const handleToggleLabel = () => {
        setIsOpen((prev) => !prev);
    };

    const handleToggleLabel2 = () => {
        setIsOpen2((prev) => !prev);
    };

    const brands = useFilterBrands(products);
    return (
        <div className={styles["filter-wrapper"]}>
            <div className={styles["filter"]}>
                <Typography variant="body-l">Filters</Typography>
                {brands.length > 0 && (
                    <div className={styles["filter-item"]}>
                        <div
                            className={styles["text-wrapper"]}
                            onClick={handleToggleLabel}
                        >
                            <Typography variant="body-s">
                                Brand <span> ({brands.length}) </span>
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
                            {brands.map((brand) => {
                                const checked = selectedBrands.includes(brand);
                                return (
                                    <label
                                        className={styles["label"]}
                                        key={brand}
                                    >
                                        <input
                                            type="checkbox"
                                            className={styles["checkbox"]}
                                            checked={checked}
                                            onChange={() =>
                                                onToggleBrand(brand)
                                            }
                                        />
                                        <Typography variant="body-xs">
                                            {brand}
                                        </Typography>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className={styles["filter-item"]}>
                    <div
                        className={styles["text-wrapper"]}
                        onClick={handleToggleLabel2}
                    >
                        <Typography variant="body-s">Stock</Typography>
                        <div
                            className={cn(styles["arrow-bottom"], {
                                [styles["open"]]: isOpen2,
                            })}
                        >
                            <ArrowBottom />
                        </div>
                    </div>
                    <div
                        className={cn(styles["list"], {
                            [styles["open"]]: isOpen2,
                        })}
                    >
                        <label className={styles["label-stock"]}>
                            <input
                                type="checkbox"
                                className={styles["checkbox"]}
                                checked={inStock}
                                onChange={onToggleInStock}
                            />
                            <Typography variant="body-xs">in Stock</Typography>
                        </label>
                    </div>
                </div>
            </div>

            <Button variant="fill" onclick={onResetFilters}>
                Reset filters{" "}
            </Button>
        </div>
    );
}

export default FilterProducts;
