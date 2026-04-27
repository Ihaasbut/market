import { Link } from "react-router-dom";
import Logo from "@/shared/assets/images/Logo.png";
import styles from "./HeaderDesktop.module.scss";
import HeaderUserButton from "./HeaderUserButton";
import NavLinksDesktop from "./NavLinksDesktop";

type HeaderDesktopProps = {
    onLogout?: () => void;
};

function HeaderDesktop({ onLogout }: HeaderDesktopProps) {
    return (
        <div className={styles["desktop"]}>
            <div className={styles["wrapper"]}>
                <div className="container">
                    <div className={styles["inner"]}>
                        <Link to={"/"} className={styles["logo"]}>
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <NavLinksDesktop/>
                        <HeaderUserButton onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderDesktop;
