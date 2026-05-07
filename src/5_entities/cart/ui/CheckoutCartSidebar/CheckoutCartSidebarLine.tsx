import { useEffect } from "react";
import { useGetProductDetailQuery } from "@/shared/api/api";
import { normalizeImageUrl } from "@/shared/lib/image";
import { useAppDispatch } from "@/shared/store";
import { payableUnitPrice } from "@/shared/ui/ProductPrice";
import { Typography } from "@/shared/ui/Typography";

import { updateCartItemSnapshot } from "../../model/cartSlice";
import type { CartItem } from "../../model/types";
import styles from "./CheckoutCartSidebar.module.scss";

export type CheckoutCartSidebarLineProps = CartItem;

export function CheckoutCartSidebarLine({
    id,
    count,
    title,
    image,
    price,
    discountPercentage,
}: CheckoutCartSidebarLineProps) {
    const dispatch = useAppDispatch();
    const hasLegacySnapshot =
        title === `Product #${id}` && image === "" && price === 0;
    const { data: fallbackProduct } = useGetProductDetailQuery(id, {
        skip: !hasLegacySnapshot,
    });

    const displayTitle = fallbackProduct?.title ?? title;
    const displayImage = fallbackProduct?.images?.[0] ?? image;
    const displayPrice = fallbackProduct?.price ?? price;
    const displayDiscountPercentage =
        fallbackProduct?.discountPercentage ?? discountPercentage;
    const imageUrl = displayImage ? normalizeImageUrl(displayImage) : null;
    const unitPrice = payableUnitPrice(
        displayPrice,
        displayDiscountPercentage,
    );
    const lineTotal = unitPrice * count;

    useEffect(() => {
        if (!hasLegacySnapshot || !fallbackProduct) {
            return;
        }

        dispatch(
            updateCartItemSnapshot({
                id,
                title: fallbackProduct.title,
                image: fallbackProduct.images[0] ?? "",
                price: fallbackProduct.price,
                discountPercentage: fallbackProduct.discountPercentage,
            }),
        );
    }, [dispatch, fallbackProduct, hasLegacySnapshot, id]);

    return (
        <li className={styles.line}>
            <div className={styles.thumb} aria-hidden={!imageUrl}>
                {imageUrl ? (
                    <img
                        className={styles.thumbImg}
                        src={imageUrl}
                        alt=""
                    />
                ) : null}
            </div>
            <div className={styles.lineBody}>
                <Typography
                    variant="body-m"
                    as="span"
                    className={styles.lineTitle}
                >
                    {displayTitle}
                </Typography>
                <Typography
                    variant="body-xs"
                    as="span"
                    className={styles.lineMeta}
                >
                    {count} × {unitPrice}$
                </Typography>
            </div>
            <Typography
                variant="body-m"
                as="span"
                className={styles.lineTotal}
            >
                {lineTotal}$
            </Typography>
        </li>
    );
}
