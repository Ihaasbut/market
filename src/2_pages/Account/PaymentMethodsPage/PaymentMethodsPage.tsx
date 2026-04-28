import heading from "../accountPageHeading.module.scss";
import styles from "../AccountSectionPlaceholder.module.scss";

export function PaymentMethodsPage() {
    return (
        <>
            <h1 className={heading["title"]}>Payment methods</h1>
            <p className={heading["desc"]}>
                Saved cards and other payment options.
            </p>
            <div>
                <p className={styles["text"]}>
                    Securely store cards and digital wallets for faster checkout.
                    You can add, remove, and set a default payment method.
                </p>
                <p className={`${styles["text"]} ${styles["muted"]}`}>
                    No payment data is stored in this portfolio demo.
                </p>
            </div>
        </>
    );
}
