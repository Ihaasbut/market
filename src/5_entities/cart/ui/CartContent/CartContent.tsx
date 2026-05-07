import { SelectAllProducts } from "@/shared/ui/SelectAllProducts";
import { Typography } from "@/shared/ui/Typography";

import { useCartContent } from "../../model/CartContent";
import type { CartItem } from "../../model/types";
import { CartLine } from "../CartLine";
import { CartOrderSummary } from "../CartOrderSummary";
import styles from "./CartContent.module.scss";

export type CartContentProps = {
    items: CartItem[];
    initialExcludedFromSummary: number[];
};

export function CartContent({
    items,
    initialExcludedFromSummary,
}: CartContentProps) {
    const {
        effectiveExcluded,
        onIncludedInSummaryChange,
        allItemsSelectedForSummary,
        onSelectAllInSummaryChange,
        onRequestRemoveAllCartLines,
        subtotal,
        shippingUsd,
        summaryItems,
    } = useCartContent(items, initialExcludedFromSummary);

    const isCartEmpty = items.length === 0;
    const selectAllDisabled = isCartEmpty;

    return (
        <div className={styles["layout"]}>
            <div className={styles["main"]}>
                <Typography variant="h4" as="h1" className={styles["title"]}>
                    Cart
                </Typography>
                <SelectAllProducts
                    checked={allItemsSelectedForSummary}
                    disabled={selectAllDisabled}
                    onSelectAllChange={onSelectAllInSummaryChange}
                    checkboxAriaLabel="Select all items for order total"
                    hasItems={!isCartEmpty}
                    action={{
                        onClick: onRequestRemoveAllCartLines,
                        ariaLabel: "Remove all items from cart",
                        visible: allItemsSelectedForSummary,
                    }}
                />
                {isCartEmpty ? (
                    <Typography variant="body-m" className={styles["empty"]}>
                        Your cart is empty. Add items from product pages.
                    </Typography>
                ) : (
                    <ul className={styles["list"]}>
                        {items.map((cartProduct) => (
                            <CartLine
                                key={cartProduct.id}
                                {...cartProduct}
                                includedInSummary={
                                    !effectiveExcluded.includes(
                                        cartProduct.id,
                                    )
                                }
                                onIncludedInSummaryChange={
                                    onIncludedInSummaryChange
                                }
                            />
                        ))}
                    </ul>
                )}
            </div>
            {items.length > 0 ? (
                <CartOrderSummary
                    subtotal={subtotal}
                    shippingUsd={shippingUsd}
                    checkoutProductIds={summaryItems.map((item) => item.id)}
                />
            ) : null}
        </div>
    );
}
