import cn from "classnames";
import { Link, useLocation } from "react-router-dom";
import { selectAuthUser } from "@/features/auth";
import { selectCartTotalQuantity } from "@/entities/cart/model";
import Cart from "@/shared/assets/icon/Cart";
import Favorite from "@/shared/assets/icon/Favorite";
import UserAccount from "@/shared/assets/icon/UserAccount";
import { useAppSelector } from "@/shared/store";
import styles from "./HeaderUserButton.module.scss";

function HeaderUserButton() {
    const { pathname } = useLocation();
    const user = useAppSelector((state) => selectAuthUser(state.auth));
    const cartTotalQuantity = useAppSelector((state) =>
        selectCartTotalQuantity(state.cart),
    );

    const isFavoritesActive =
        pathname === "/favorites" || pathname.startsWith("/favorites/");
    const isAccountActive =
        pathname === "/account" || pathname.startsWith("/account/");
    const isCartActive = pathname === "/cart" || pathname.startsWith("/cart/");

    return (
        <div className={styles["buttons"]}>
            <Link
                to="/favorites"
                className={cn(
                    styles["icon-slot"],
                    styles["favorite-link"],
                    isFavoritesActive && styles["active"],
                )}
                aria-label="Favorites"
            >
                <Favorite />
            </Link>
            {user ? (
                <div className={styles["profile"]}>
                    <Link
                        to="/account"
                        className={cn(
                            styles["icon-button"],
                            isAccountActive && styles["active"],
                        )}
                        aria-label="Account"
                    >
                        <UserAccount />
                    </Link>
                </div>
            ) : null}
            <Link
                to="/cart"
                className={cn(
                    styles["icon-slot"],
                    styles["cart-wrap"],
                    styles["cart-link"],
                    isCartActive && styles["active"],
                )}
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
