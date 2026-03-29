import { Link } from "react-router-dom";
import Logo from "@/shared/assets/images/Logo.png";
import styles from "./HeaderDesktop.module.css";
import HeaderUserButton from "./HeaderUserButton";
import NavLinksDesktop from "./NavLinksDesktop";


function HeaderDesktop() {
    return (
        <div className={styles["desktop"]}>
            <div className={styles["wrapper"]}>
                <div className="container">
                    <div className={styles["inner"]}>
                        <Link to={"/"} className={styles["logo"]}>
                            <img src={Logo} alt="Logo" />
                        </Link>
                        <NavLinksDesktop/>
                        <HeaderUserButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderDesktop;
