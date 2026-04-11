import styles from "./ScreenBlue.module.scss";

export const ScreenBlue = () => {
    return (
        <div
            className={styles.root}
            role="status"
            aria-live="polite"
            aria-label="Загрузка"
        >
            <span className={styles.spinner} aria-hidden />
        </div>
    );
};
