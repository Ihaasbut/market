import Cart from "@/shared/assets/icon/Cart";
import Favorite from "@/shared/assets/icon/Favorite";
import styles from "./HeaderUserButton.module.scss";

function HeaderUserButton() {
    return (
        <div className={styles["buttons"]}>
            <Favorite /> <Cart />
        </div>
    );
}

export default HeaderUserButton;
