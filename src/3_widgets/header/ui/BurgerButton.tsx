import styles from "./BurgerButton.module.css";

type BurgerButtonProps = {
    onToggle: () => void;
};

function BurgerButton({ onToggle }: BurgerButtonProps) {
    return (
        <div
            className={styles["burger-menu"]}
            //   onClick={() => setIsOpenMenu((prev) => !prev)}
            onClick={onToggle}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}

export default BurgerButton;
