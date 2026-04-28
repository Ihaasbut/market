import cn from "classnames";
import { useMemo } from "react";

import type { ProductDetailType } from "@/shared/api/api.types";

import styles from "./ProductDetailCharacteristics.module.scss";

export type ProductDetailCharacteristicsProps = {
    product: ProductDetailType;
};

type SpecItem = { label: string; value: string };

export function ProductDetailCharacteristics({
    product,
}: ProductDetailCharacteristicsProps) {
    const items = useMemo((): SpecItem[] => {
        const next: SpecItem[] = [];

        if (product.dimensions) {
            next.push({
                label: "Width",
                value: `${product.dimensions.width} cm`,
            });
            next.push({
                label: "Length",
                value: `${product.dimensions.depth} cm`,
            });
        }

        const brand = product.brand?.trim();
        if (brand) {
            next.push({ label: "Brand", value: brand });
        }

        const sku = product.sku?.trim();
        if (sku) {
            next.push({ label: "SKU", value: sku });
        }

        if (product.weight != null) {
            next.push({
                label: "Weight",
                value: `${product.weight} kg`,
            });
        }

        if (typeof product.minimumOrderQuantity === "number") {
            next.push({
                label: "Minimum order quantity",
                value: String(product.minimumOrderQuantity),
            });
        }

        const warranty = product.warrantyInformation?.trim();
        if (warranty) {
            next.push({ label: "Warranty", value: warranty });
        }

        const shipping = product.shippingInformation?.trim();
        if (shipping) {
            next.push({ label: "Shipping", value: shipping });
        }

        const returnPolicy = product.returnPolicy?.trim();
        if (returnPolicy) {
            next.push({ label: "Return policy", value: returnPolicy });
        }

        return next;
    }, [product]);

    if (items.length === 0) {
        return null;
    }

    return (
        <section
            className={styles["root"]}
            aria-label="Key product specifications"
        >
            <ul className={styles["grid"]}>
                {items.map((item, index) => (
                    <li
                        key={`${item.label}-${index}`}
                        className={cn(
                            styles["item"],
                            Math.floor(index / 2) % 2 === 0
                                ? styles["item_light"]
                                : styles["item_gray"],
                        )}
                    >
                        <span className={styles["label"]}>{item.label}</span>
                        <span className={styles["value"]}>{item.value}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default ProductDetailCharacteristics;
