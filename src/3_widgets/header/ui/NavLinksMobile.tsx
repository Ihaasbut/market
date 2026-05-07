import cn from "classnames";

import { Link, NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "@/shared/api/api";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { useNavLinks } from "../model/useNavLinks";
import styles from "./NavLinksMobile.module.scss";

type NavLinksProps = {
    onToggle: () => void;
};

function NavLinksMobile({ onToggle }: NavLinksProps) {
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery();

    const { isOpenCatalog, catalogRef, onOpen, handleLinkClick, NAV_LINKS } =
        useNavLinks({ onToggle });

    if (categoriesLoading) {
        return;
    }
    if (categoriesError || !categories) {
        return null;
    }
    return (
        <div className={styles["nav-list"]}>
            {NAV_LINKS.map((link) =>
                link.text !== "Catalog" ? (
                    <NavLink
                        key={link.link}
                        to={link.link}
                        className={({ isActive }) =>
                            cn(
                                styles["nav-list-item"],
                                isActive && styles["active"],
                            )
                        }
                        onClick={handleLinkClick}
                    >
                        <Typography variant="h5">{link.text}</Typography>
                    </NavLink>
                ) : (
                    <div
                        key={link.link}
                        className={styles["nav-list-item-block"]}
                        ref={catalogRef}
                    >
                        <div
                            className={styles["text-wrapper"]}
                            onClick={onOpen}
                        >
                            <Typography variant="h5">{link.text}</Typography>
                            <ArrowBottom />
                        </div>

                        <div
                            className={cn(styles["nav-list-item-inner"], {
                                [styles["open"]]: isOpenCatalog,
                            })}
                        >
                            <div
                                className={styles["nav-list-item-list"]}
                                onClick={onOpen}
                            >
                                {categories
                                    .slice(0, 7)
                                    .map((links, index) => (
                                        <NavLink
                                            key={index + links.name}
                                            to={`/categories/${links.slug}`}
                                            className={({ isActive }) =>
                                                cn(
                                                    styles[
                                                        "nav-list-item-list-item"
                                                    ],
                                                    isActive &&
                                                        styles["active"],
                                                )
                                            }
                                            onClick={handleLinkClick}
                                        >
                                            {links.name}
                                        </NavLink>
                                    ))}
                            </div>

                            <Link to={"categories"} onClick={handleLinkClick}>
                                <Button variant="fill">Categories</Button>
                            </Link>
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}

export default NavLinksMobile;
