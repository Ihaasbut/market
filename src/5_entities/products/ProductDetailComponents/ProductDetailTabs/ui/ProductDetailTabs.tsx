import { Typography } from "@/shared/ui/Typography";
import styles from "./ProductDetailTabs.module.css";

export type ProductDetailTabsProps = {
    tabs: string[];
};

export function ProductDetailTabs({ tabs }: ProductDetailTabsProps) {
    return (
        <div className={styles["tabs-block"]}>
            <div className={styles["tab"]}>
                {tabs.map((tab) => (
                    <div>
                        <Typography variant="body-s">{tab}</Typography>
                    </div>
                ))}
            </div>
            <div className={styles["tab-content"]}></div>
        </div>
    );
}

export default ProductDetailTabs;
