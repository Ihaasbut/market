import styles from "./BurgerButton.module.scss";

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
