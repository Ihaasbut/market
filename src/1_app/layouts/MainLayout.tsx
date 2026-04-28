import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/header";
import { ScrollToTop } from "../router/ScrollTop";
import styles from "./MainLayout.module.scss";

export function MainLayout() {
    return (
        <div className={styles["root-layout"]}>
            <ScrollToTop />
            <Header />
            <div className={styles["wrapper"]}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
