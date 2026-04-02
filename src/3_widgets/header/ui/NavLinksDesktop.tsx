import cn from "classnames";
import { Link, NavLink } from "react-router-dom";

import { useGetCategoriesQuery } from "@/shared/api/api";
import ArrowBottom from "@/shared/assets/icon/ArrowBottom";
import laptops from "@/shared/assets/images/category/laptops.webp";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import { useNavLinks } from "../model/useNavLinks";
import styles from "./NavLinksDesktop.module.css";

function NavLinksDesktop() {
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
    } = useGetCategoriesQuery({isFull: false});

    const { onOpen, isOpenCatalog, catalogRef, NAV_LINKS } = useNavLinks({});

    if (categoriesLoading) {
        return <div className="container">грузится</div>;
    }
    if (categoriesError || !categories) {
        return null;
    }

    return (
        <div className={styles["nav-list"]}>
            {NAV_LINKS.map((link, index) =>
                link.text !== "Catalog" ? (
                    <NavLink
                        key={index + link.link}
                        to={link.link}
                        className={({ isActive }) =>
                            cn(
                                styles["nav-list-item"],
                                isActive && styles["active"],
                            )
                        }
                    >
                        <Typography variant="h5" className={styles["text"]}>
                            {link.text}
                        </Typography>
                    </NavLink>
                ) : (
                    <div ref={catalogRef}>
                        <div
                            className={styles["text-wrapper"]}
                            onClick={onOpen}
                        >
                            <Typography variant="h5" className={styles["text"]}>
                                {link.text}
                            </Typography>{" "}
                            <div
                                className={cn(styles["arrow-bottom"], {
                                    [styles["active"]]: isOpenCatalog === true,
                                })}
                            >
                                <ArrowBottom />
                            </div>
                        </div>

                        <div
                            className={cn(styles["nav-list-item-block"], {
                                [styles["active"]]: isOpenCatalog === true,
                            })}
                        >
                            <div
                                className={styles["nav-list-item-list"]}
                                onClick={onOpen}
                            >
                                {categories.categories.slice(0,7).map((links, index) => (
                                    <NavLink key={index + links.name}
                                        to={`/categories/${links.slug}`}
                                        className={({ isActive }) =>
                                            cn(
                                                styles[
                                                    "nav-list-item-list-item"
                                                ],
                                                isActive && styles["active"],
                                            )
                                        }
                                    >
                                        {links.name}
                                    </NavLink>
                                ))}

                                <Link
                                    to={"categories"}
                                    className={styles["button"]}
                                >
                                    <Button variant="fill">Сategories</Button>
                                </Link>
                            </div>

                            <div className={styles["image"]}>
                                <img src={laptops} />
                            </div>
                        </div>
                    </div>
                ),
            )}
        </div>
    );
}

export default NavLinksDesktop;
