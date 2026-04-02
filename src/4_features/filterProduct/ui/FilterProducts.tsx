import cn from "classnames";
import { useState } from "react";
import { Typography } from "@/shared/ui/Typography";
import styles from "./FilterProducts.module.css";

export function FilterProducts() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const onToggle = () => {
        setIsOpen((prev) => !prev);
    };
    return (
        <div className={styles["filter"]}>
            <Typography variant="body-l">Filters</Typography>
            <div className={styles["brand"]}>
                <div className={styles["text-wrapper"]} onClick={onToggle}>
                    <Typography variant="body-m"> Brand</Typography>
                </div>
                <div
                    className={cn(
                        styles["list"], 
                        {
                            [styles["open"]]: isOpen === true, 
                        },
                    )}
                >
                    <label className={cn(styles["label"])}>
                        <input type="checkbox" checked={true} />
                        Согласен с условиями

                        <input type="checkbox" checked={true} />
                        Согласен с условиями

                        <input type="checkbox" checked={true} />
                        Согласен с условиями
                    </label>
                </div>
            </div>

            <div className={styles["brand"]}>
                <div className={styles["text-wrapper"]} onClick={onToggle}>
                    <Typography variant="body-m"> Brand</Typography>
                </div>

            </div>
        </div>
    );
}

export default FilterProducts;
