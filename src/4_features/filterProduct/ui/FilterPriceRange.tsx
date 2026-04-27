import cn from "classnames";
import { Typography } from "@/shared/ui/Typography";
import type { FilterPriceRangeConfig } from "../model/FilterProducts";
import styles from "./FilterProducts.module.scss";

type FilterPriceRangeProps = {
    config: FilterPriceRangeConfig;
};

export function FilterPriceRange({ config }: FilterPriceRangeProps) {
    const {
        min,
        max,
        valueMin,
        valueMax,
        onValueMinChange,
        onValueMaxChange,
    } = config;

    const singlePrice = min >= max;

    const handleMinInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = Number(e.target.value);
        if (next > valueMax) {
            onValueMaxChange(next);
        }
        onValueMinChange(next);
    };

    const handleMaxInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = Number(e.target.value);
        if (next < valueMin) {
            onValueMinChange(next);
        }
        onValueMaxChange(next);
    };

    return (
        <div className={styles["price-range"]}>
            <div className={styles["price-range__values"]}>
                <Typography variant="body-xs">{valueMin}</Typography>
                <Typography variant="body-xs">—</Typography>
                <Typography variant="body-xs">{valueMax}</Typography>
            </div>
            {singlePrice ? null : (
                <div className={styles["price-range__sliders"]}>
                    <input
                        type="range"
                        className={styles["price-range__input"]}
                        min={min}
                        max={max}
                        step={1}
                        value={valueMin}
                        onChange={handleMinInput}
                        aria-label="Minimum price"
                    />
                    <input
                        type="range"
                        className={cn(
                            styles["price-range__input"],
                            styles["price-range__input--upper"],
                        )}
                        min={min}
                        max={max}
                        step={1}
                        value={valueMax}
                        onChange={handleMaxInput}
                        aria-label="Maximum price"
                    />
                </div>
            )}
        </div>
    );
}
