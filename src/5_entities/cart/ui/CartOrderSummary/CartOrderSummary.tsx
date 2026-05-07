import cn from "classnames";
import { Link } from "react-router-dom";
import type { CheckoutNavigateState } from "@/shared/lib/checkoutNavigateState";
import buttonStyles from "@/shared/ui/Button/Button.module.scss";
import { Typography } from "@/shared/ui/Typography";

import styles from "./CartOrderSummary.module.scss";

export type CartOrderSummaryProps = {
    subtotal: number | null;
    shippingUsd: number;
    /** Product IDs included in the order total (checkboxes). Only these go to checkout. */
    checkoutProductIds: number[];
};

export function CartOrderSummary({
    subtotal,
    shippingUsd,
    checkoutProductIds,
}: CartOrderSummaryProps) {
    const total = subtotal !== null ? subtotal + shippingUsd : null;
    const pending = subtotal === null;
    const canPlaceOrder = checkoutProductIds.length > 0;

    const checkoutState: CheckoutNavigateState = {
        checkoutProductIds,
    };

    return (
        <aside
            className={styles["summary"]}
            aria-busy={pending}
            aria-label="Order summary"
        >
            <Typography variant="body-l" as="h2" className={styles["summaryTitle"]}>
                Order summary
            </Typography>
            <div className={styles["summaryRow"]}>
                <Typography variant="body-m" as="span" className={styles["summaryLabel"]}>
                    Subtotal
                </Typography>
                <Typography variant="body-m" as="span" className={styles["summaryValue"]}>
                    {subtotal !== null ? `${subtotal}$` : "—"}
                </Typography>
            </div>
            <div className={styles["summaryRow"]}>
                <Typography variant="body-m" as="span" className={styles["summaryLabel"]}>
                    Shipping
                </Typography>
                <Typography variant="body-m" as="span" className={styles["summaryValue"]}>
                    {`${shippingUsd}$`}
                </Typography>
            </div>
            <div className={styles["summaryTotalRow"]}>
                <Typography variant="body-l" as="span" className={styles["summaryTotalLabel"]}>
                    Total
                </Typography>
                <Typography variant="body-l" as="span" className={styles["summaryTotalValue"]}>
                    {total !== null ? `${total}$` : "—"}
                </Typography>
            </div>
            <div className={styles["checkoutWrap"]}>
                {canPlaceOrder ? (
                    <Link
                        to="/cart/checkout"
                        state={checkoutState}
                        className={cn(
                            buttonStyles["button"],
                            buttonStyles["button-fill"],
                        )}
                    >
                        Place order
                    </Link>
                ) : (
                    <span
                        className={cn(
                            buttonStyles["button"],
                            buttonStyles["button-fill"],
                            styles["placeOrderDisabled"],
                        )}
                        aria-disabled="true"
                        title="Select at least one item for the order total"
                    >
                        Place order
                    </span>
                )}
            </div>
        </aside>
    );
}
