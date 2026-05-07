import { payableUnitPrice } from "@/shared/ui/ProductPrice";
import { Typography } from "@/shared/ui/Typography";

import { CART_DELIVERY_USD } from "../../model/cartDelivery";
import type { CartItem } from "../../model/types";
import styles from "./CheckoutCartSidebar.module.scss";
import { CheckoutCartSidebarLine } from "./CheckoutCartSidebarLine";

export type CheckoutCartSidebarProps = {
    items: CartItem[];
};

export function CheckoutCartSidebar({ items }: CheckoutCartSidebarProps) {
    const activeLines = items.filter((item) => item.count > 0);

    const subtotal = activeLines.reduce((sum, item) => {
        const unit = payableUnitPrice(item.price, item.discountPercentage);
        return sum + unit * item.count;
    }, 0);

    const total = subtotal + CART_DELIVERY_USD;

    return (
        <aside className={styles.aside} aria-label="Cart items for this order">
            <Typography variant="body-l" as="h2" className={styles.asideTitle}>
                Your cart
            </Typography>
            <ul className={styles.list}>
                {activeLines.map((item) => (
                    <CheckoutCartSidebarLine key={item.id} {...item} />
                ))}
            </ul>
            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <Typography
                        variant="body-m"
                        as="span"
                        className={styles.summaryLabel}
                    >
                        Subtotal
                    </Typography>
                    <Typography
                        variant="body-m"
                        as="span"
                        className={styles.summaryValue}
                    >
                        {subtotal}$
                    </Typography>
                </div>
                <div className={styles.summaryRow}>
                    <Typography
                        variant="body-m"
                        as="span"
                        className={styles.summaryLabel}
                    >
                        Shipping
                    </Typography>
                    <Typography
                        variant="body-m"
                        as="span"
                        className={styles.summaryValue}
                    >
                        {CART_DELIVERY_USD}$
                    </Typography>
                </div>
                <div className={styles.summaryTotalRow}>
                    <Typography
                        variant="body-l"
                        as="span"
                        className={styles.summaryTotalLabel}
                    >
                        Total
                    </Typography>
                    <Typography
                        variant="body-l"
                        as="span"
                        className={styles.summaryTotalValue}
                    >
                        {total}$
                    </Typography>
                </div>
            </div>
            <Typography variant="body-xs" className={styles.hint}>
                To change quantities or remove items, use the full cart page.
            </Typography>
        </aside>
    );
}
