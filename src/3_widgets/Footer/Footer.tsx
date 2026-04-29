import { Link } from "react-router-dom";

import { HEADER_NAV_LINKS } from "@/widgets/header/model/headerNavLinks";
import LogoBlack from "@/shared/assets/images/Logo-black.png";

import styles from "./Footer.module.scss";

export function Footer() {
    return (
        <footer className={styles["footer"]}>
            <div className="container">
                <div className={styles["main"]}>
                    <div className={styles["col-logo"]}>
                        <Link to="/" className={styles["logo"]}>
                            <img src={LogoBlack} alt="Golden Soft" />
                        </Link>
                    </div>
                    <div className={styles["col"]}>
                        <h3 className={styles["title"]}>Navigation</h3>
                        <nav
                            className={styles["nav"]}
                            aria-label="Footer navigation"
                        >
                            {HEADER_NAV_LINKS.map((item) => (
                                <Link
                                    key={`${item.link}-${item.text}`}
                                    to={item.link}
                                    className={styles["link"]}
                                >
                                    {item.text}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className={styles["col"]}>
                        <h3 className={styles["title"]}>Contact us</h3>
                        <div className={styles["contacts"]}>
                            <a
                                href="tel:+12125550147"
                                className={styles["contactLink"]}
                            >
                                +1 (212) 555-0147
                            </a>
                            <a
                                href="tel:+12125550198"
                                className={styles["contactLink"]}
                            >
                                +1 (212) 555-0198
                            </a>
                            <a
                                href="mailto:support@goldensoft.com"
                                className={styles["contactLink"]}
                            >
                                support@goldensoft.com
                            </a>
                        </div>
                    </div>
                    <div className={styles["col"]}>
                        <h3 className={styles["title"]}>Our address</h3>
                        <address className={styles["address"]}>
                            350 Madison Avenue, Suite 1800, New York, NY 10017,
                            United States
                        </address>
                    </div>
                    <div className={styles["col"]}>
                        <h3 className={styles["title"]}>Information</h3>
                        <ul className={styles["infoList"]}>
                            <li>Warranty</li>
                            <li>Delivery</li>
                            <li>Product returns</li>
                        </ul>
                    </div>
                </div>
                <div className={styles["bottom"]}>
                    <p className={styles["copy"]}>
                        © 2021 Golden Soft All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
