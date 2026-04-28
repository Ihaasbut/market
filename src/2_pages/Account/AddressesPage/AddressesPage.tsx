import heading from "../accountPageHeading.module.scss";
import styles from "../AccountSectionPlaceholder.module.scss";

export function AddressesPage() {
    return (
        <>
            <h1 className={heading["title"]}>My addresses</h1>
            <p className={heading["desc"]}>
                Manage delivery and billing addresses.
            </p>
            <div>
                <p className={styles["text"]}>
                    Save your default shipping and billing addresses to speed
                    through checkout. You can set a label for each one (e.g.
                    Home, Work).
                </p>
                <p className={`${styles["text"]} ${styles["muted"]}`}>
                    This screen is a placeholder. Address book will appear here
                    after backend integration.
                </p>
            </div>
        </>
    );
}
