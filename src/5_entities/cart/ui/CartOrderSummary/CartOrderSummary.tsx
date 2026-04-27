import { Typography } from "@/shared/ui/Typography";

import styles from "./CartOrderSummary.module.scss";

export type CartOrderSummaryProps = {
    subtotal: number | null;
    shippingUsd: number;
};

export function CartOrderSummary({ subtotal, shippingUsd }: CartOrderSummaryProps) {
    const total = subtotal !== null ? subtotal + shippingUsd : null;
    const pending = subtotal === null;

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
        </aside>
    );
}
