import { NavLink, Navigate, Outlet } from "react-router-dom";
import { logoutUser, selectAuthUser } from "@/features/auth";
import { useAppDispatch, useAppSelector } from "@/shared/store";
import styles from "./AccountLayout.module.scss";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles["nav-link"]} ${isActive ? styles["nav-link-active"] : ""}`;

export function AccountLayout() {
    const user = useAppSelector((state) => selectAuthUser(state.auth));
    const dispatch = useAppDispatch();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="container">
            <div className={styles["page"]}>
                <div className={styles["layout"]}>
                    <aside className={styles["sidebar"]} aria-label="Account">
                        <p className={styles["sidebar-title"]}>My account</p>
                        <p className={styles["user-line"]}>{user.email}</p>
                        <ul className={styles["nav"]}>
                            <li>
                                <NavLink
                                    to="/account"
                                    end
                                    className={navLinkClass}
                                >
                                    Personal details
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/account/orders"
                                    className={navLinkClass}
                                >
                                    My orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/account/addresses"
                                    className={navLinkClass}
                                >
                                    My addresses
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/account/payment"
                                    className={navLinkClass}
                                >
                                    Payment methods
                                </NavLink>
                            </li>
                        </ul>
                        <div className={styles["sidebar-foot"]}>
                            <button
                                type="button"
                                className={styles["logout"]}
                                onClick={() => {
                                    void dispatch(logoutUser());
                                }}
                            >
                                Log out
                            </button>
                        </div>
                    </aside>
                    <div className={styles["main"]}>
                        <div className={styles["main-inner"]}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
