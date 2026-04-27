import cn from "classnames";
import styles from "./CartQuantityStepper.module.scss";

export type CartQuantityStepperProps = {
    count: number;
    onIncrement: () => void;
    onDecrement: () => void;
    decreaseDisabled?: boolean;
    increaseDisabled?: boolean;
    className?: string;
    /** Match primary button width in product hero (avoids layout shift). */
    layout?: "hug" | "stretch";
};

export function CartQuantityStepper({
    count,
    onIncrement,
    onDecrement,
    decreaseDisabled = false,
    increaseDisabled = false,
    className,
    layout = "hug",
}: CartQuantityStepperProps) {
    return (
        <div
            className={cn(
                styles.root,
                layout === "stretch" && styles["rootStretch"],
                className,
            )}
            role="group"
            aria-label="Quantity"
        >
            <button
                type="button"
                className={styles.stepBtn}
                aria-label="Decrease quantity"
                disabled={decreaseDisabled}
                onClick={onDecrement}
            >
                −
            </button>
            <span className={styles.stepValue}>{count}</span>
            <button
                type="button"
                className={styles.stepBtn}
                aria-label="Increase quantity"
                disabled={increaseDisabled}
                onClick={onIncrement}
            >
                +
            </button>
        </div>
    );
}
