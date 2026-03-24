import cn from "classnames";
import CloseBurgerMenu from "@/shared/assets/icon/CloseBurgerMenu";
import { useHeaderState } from "../model/useHeaderState";
import BurgerButton from "./BurgerButton";

import styles from "./HeaderMobile.module.css";
import HeaderUserButton from "./HeaderUserButton";
import NavLinks from "./NavLinks";

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
                    <NavLinks />
                </div>
            </div>
        </div>
    );
}

export default HeaderMobile;
