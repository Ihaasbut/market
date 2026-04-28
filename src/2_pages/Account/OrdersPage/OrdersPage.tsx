import heading from "../accountPageHeading.module.scss";
import styles from "../AccountSectionPlaceholder.module.scss";

export function OrdersPage() {
    return (
        <>
            <h1 className={heading["title"]}>My orders</h1>
            <p className={heading["desc"]}>
                View order status and past purchases.
            </p>
            <div>
                <p className={styles["text"]}>
                    You have no demo orders yet. When you place an order, it
                    will show up here with status, tracking, and a link to the
                    receipt.
                </p>
                <p className={`${styles["text"]} ${styles["muted"]}`}>
                    Connect a real API to load order history for signed-in
                    customers.
                </p>
            </div>
        </>
    );
}
