import cn from "classnames";
import RemoveFromCartLine from "@/shared/assets/icon/RemoveFromCartLine";

import styles from "./SelectAllProducts.module.scss";

export type SelectAllProductsAction = {
    onClick: () => void;
    ariaLabel: string;
    visible: boolean;
};

export type SelectAllProductsProps = {
    checked: boolean;
    disabled: boolean;
    onSelectAllChange: (selectAll: boolean) => void;
    checkboxAriaLabel: string;
    labelText?: string;
    hasItems: boolean;
    action?: SelectAllProductsAction;
    className?: string;
};

export function SelectAllProducts({
    checked,
    disabled,
    onSelectAllChange,
    checkboxAriaLabel,
    labelText = "Select all",
    hasItems,
    action,
    className,
}: SelectAllProductsProps) {
    const showActionButton = action?.visible;

    return (
        <div className={cn(styles["row"], className)}>
            <label className={styles["label"]}>
                <input
                    type="checkbox"
                    className={styles["checkbox"]}
                    checked={checked}
                    disabled={disabled}
                    onChange={(e) => onSelectAllChange(e.target.checked)}
                    aria-label={checkboxAriaLabel}
                />
                <span className={styles["labelText"]}>{labelText}</span>
            </label>
            {hasItems ? (
                <div className={styles["actionSlot"]}>
                    {showActionButton && action ? (
                        <button
                            type="button"
                            className={styles["actionButton"]}
                            onClick={action.onClick}
                            aria-label={action.ariaLabel}
                        >
                            <RemoveFromCartLine />
                        </button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
