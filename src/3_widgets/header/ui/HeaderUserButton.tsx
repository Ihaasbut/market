import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { selectAuthUser } from "@/features/auth";
import { CART_FLY_TARGET_ATTR } from "@/features/cartFly";
import { selectCartTotalQuantity } from "@/entities/cart/model";
import { selectFavoritesCount } from "@/entities/favorite/model";
import Cart from "@/shared/assets/icon/Cart";
import Favorite from "@/shared/assets/icon/Favorite";
import UserAccount from "@/shared/assets/icon/UserAccount";
import { useAppSelector } from "@/shared/store";
import styles from "./HeaderUserButton.module.scss";

type HeaderUserButtonProps = {
    onLogout?: () => void;
};

function HeaderUserButton({ onLogout }: HeaderUserButtonProps) {
    const user = useAppSelector((state) => selectAuthUser(state.auth));
    const cartTotalQuantity = useAppSelector((state) =>
        selectCartTotalQuantity(state.cart),
    );
    const favoritesCount = useAppSelector((state) =>
        selectFavoritesCount(state.favorite),
    );
    const [menuOpen, setMenuOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapRef.current &&
                !wrapRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("click", handleClickOutside);
            return () =>
                document.removeEventListener("click", handleClickOutside);
        }
    }, [menuOpen]);

    const handleLogout = () => {
        setMenuOpen(false);
        onLogout?.();
    };

    return (
        <div className={styles["buttons"]}>
            <Link
                to="/favorites"
                className={`${styles["icon-slot"]} ${styles["favorite-wrap"]} ${styles["favorite-link"]}`}
                aria-label="Favorites"
            >
                <Favorite />
                {favoritesCount > 0 ? (
                    <span
                        className={styles["cart-badge"]}
                        aria-label={`Favorites: ${favoritesCount}`}
                    >
                        {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                ) : null}
            </Link>
            {user ? (
                <div className={styles["profile"]} ref={wrapRef}>
                    <button
                        type="button"
                        className={styles["icon-button"]}
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-expanded={menuOpen}
                        aria-haspopup="true"
                        aria-label="Account menu"
                    >
                        <UserAccount />
                    </button>
                    {menuOpen ? (
                        <div
                            className={styles["dropdown"]}
                            role="menu"
                            aria-label="Account"
                        >
                            <p className={styles["dropdown-email"]}>
                                {user.email}
                            </p>
                            <p className={styles["dropdown-email"]}>
                                My orders
                            </p>
                            <p className={styles["dropdown-email"]}>
                                My addresses
                            </p>
                            <button
                                type="button"
                                className={styles["dropdown-logout"]}
                                role="menuitem"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}
            <Link
                to="/cart"
                {...{ [CART_FLY_TARGET_ATTR]: "" }}
                className={`${styles["icon-slot"]} ${styles["cart-wrap"]} ${styles["cart-link"]}`}
                aria-label="Cart"
            >
                <Cart />
                {cartTotalQuantity > 0 ? (
                    <span
                        className={styles["cart-badge"]}
                        aria-label={`Cart items: ${cartTotalQuantity}`}
                    >
                        {cartTotalQuantity > 99 ? "99+" : cartTotalQuantity}
                    </span>
                ) : null}
            </Link>
        </div>
    );
}

export default HeaderUserButton;
