import cn from "classnames";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
    decrementCartItem,
    incrementCartItem,
    removeFromCart,
    updateCartItemSnapshot,
} from "@/entities/cart/model";
import { useGetProductDetailQuery } from "@/shared/api/api";
import RemoveFromCartLine from "@/shared/assets/icon/RemoveFromCartLine";
import { normalizeImageUrl } from "@/shared/lib/image";
import { useAppDispatch } from "@/shared/store";
import { CartQuantityStepper } from "@/shared/ui/CartQuantityStepper";
import { payableUnitPrice } from "@/shared/ui/ProductPrice";
import { Typography } from "@/shared/ui/Typography";

import type { CartItem } from "../../model/types";
import styles from "./CartLine.module.scss";

export type CartLineProps = CartItem & {
    includedInSummary: boolean;
    onIncludedInSummaryChange: (id: number, included: boolean) => void;
};

export function CartLine({
    id,
    count,
    title,
    image,
    price,
    discountPercentage,
    includedInSummary,
    onIncludedInSummaryChange,
}: CartLineProps) {
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
        <li className={styles["row"]}>
            <Link
                to={`/product/${id}`}
                className={styles["rowNavOverlay"]}
                aria-label={`View product: ${displayTitle}`}
            />
            <div className={styles["rowBody"]}>
                <div className={styles["media"]}>
                    <div className={styles["thumbWrap"]}>
                        <label
                            className={cn(
                                styles["includeOverlay"],
                                styles["rowPointerAuto"],
                            )}
                        >
                            <input
                                type="checkbox"
                                className={styles["includeCheckbox"]}
                                checked={includedInSummary}
                                onChange={(e) =>
                                    onIncludedInSummaryChange(
                                        id,
                                        e.target.checked,
                                    )
                                }
                                aria-label="Include in order total"
                            />
                        </label>
                        <div className={styles["thumb"]}>
                            {imageUrl ? (
                                <img
                                    className={styles["thumbImg"]}
                                    src={imageUrl}
                                    alt=""
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className={styles["titleCol"]}>
                        <Typography
                            variant="body-m"
                            as="span"
                            className={styles["titleText"]}
                        >
                            {displayTitle}
                        </Typography>
                        <button
                            type="button"
                            className={cn(
                                styles["lineRemoveButton"],
                                styles["rowPointerAuto"],
                            )}
                            onClick={() => dispatch(removeFromCart(id))}
                            aria-label="Remove from cart"
                        >
                            <RemoveFromCartLine />
                        </button>
                    </div>
                </div>
                <div className={styles["lineTotalCol"]}>
                    <Typography
                        variant="body-l"
                        as="span"
                        className={styles["lineTotal"]}
                    >
                        {lineTotal}$
                    </Typography>
                </div>
                <div
                    className={cn(
                        styles["actions"],
                        styles["rowPointerAuto"],
                    )}
                >
                    <div className={styles["quantityBlock"]}>
                        <CartQuantityStepper
                            count={count}
                            onIncrement={() => dispatch(incrementCartItem(id))}
                            onDecrement={() => dispatch(decrementCartItem(id))}
                            decreaseDisabled={count <= 0}
                        />
                        {count > 0 ? (
                            <Typography
                                variant="body-xs"
                                as="span"
                                className={styles["unitPriceHint"]}
                            >
                                {unitPrice}$ / 1 item
                            </Typography>
                        ) : null}
                    </div>
                </div>
            </div>
        </li>
    );
}
