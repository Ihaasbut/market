import cn from "classnames";
import { NavLink } from "react-router-dom";
import { Typography } from "@/shared/ui/Typography";
import styles from "./NavLinks.module.css";

const navLinks = [
    {
        link: "/",
        text: "Home",
    },
    {
        link: "categories",
        text: "Catalog",
    },
    {
        link: "Wholesale",
        text: "Wholesale",
    },
    {
        link: "/aboutus",
        text: "About Us",
    },
];

function NavLinks() {
    return (
        <div className={styles["list"]}>
            {navLinks.map((link) => (
                <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                        cn(styles["item"], isActive && styles["item-active"])
                    }
                >
                    <Typography variant="h5" className={styles["text"]}>
                        {link.text}
                    </Typography>
                </NavLink>
            ))}
        </div>
    );
}

export default NavLinks;
