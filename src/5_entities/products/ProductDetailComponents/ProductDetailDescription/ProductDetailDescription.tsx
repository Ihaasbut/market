import type { ProductDetailType } from "@/shared/api/api.types";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ProductDetailDescription.module.scss";

export type ProductDetailDescriptionProps = {
    product: ProductDetailType;
};

export function ProductDetailDescription({
    product,
}: ProductDetailDescriptionProps) {
    const text = product.description?.trim();

    if (!text) {
        return (
            <div className={styles["root"]}>
                <Typography variant="body-l" className={styles["empty"]}>
                    No description available.
                </Typography>
            </div>
        );
    }

    return (
        <div className={styles["root"]}>
            <Typography variant="body-l" className={styles["text"]}>
                {text}
            </Typography>
        </div>
    );
}

export default ProductDetailDescription;
