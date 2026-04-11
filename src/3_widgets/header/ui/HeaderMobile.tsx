import cn from "classnames";
import CloseBurgerMenu from "@/shared/assets/icon/CloseBurgerMenu";
import { useHeaderState } from "../model/useHeaderState";
import BurgerButton from "./BurgerButton";

import styles from "./HeaderMobile.module.scss";
import HeaderUserButton from "./HeaderUserButton";
import NavLinksMobile from "./NavLinksMobile";

function HeaderMobile() {
    const { isMenuOpen, toggleMenu } = useHeaderState();
    return (
        <div className={styles["mobile"]}>
            <div className={styles["wrapper"]}>
                <div className="container">
                    <div className={styles["inner"]}>
                        {isMenuOpen ? (
                            <CloseBurgerMenu onToggle={toggleMenu} />
                        ) : (
                            <BurgerButton onToggle={toggleMenu} />
                        )}

                        <HeaderUserButton />
                    </div>
                </div>
            </div>
            <div
                className={cn(styles["wrapper-links"], {
                    [styles["open"]]: isMenuOpen,
                })}
            >
                <div className="container">
                    <NavLinksMobile onToggle={toggleMenu} />
                </div>
            </div>
        </div>
    );
}

export default HeaderMobile;
