import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/header";
import { logoutUser } from "@/features/auth";
import { useAppDispatch } from "@/shared/store";
import { ScrollToTop } from "../router/ScrollTop";
import styles from "./MainLayout.module.scss";

export function MainLayout() {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        void dispatch(logoutUser());
    };

    return (
        <div className={styles["root-layout"]}>
            <ScrollToTop />
            <Header onLogout={handleLogout} />
            <div className={styles["wrapper"]}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
