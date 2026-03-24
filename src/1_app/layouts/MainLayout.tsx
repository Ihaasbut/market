import { Outlet } from "react-router-dom";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/header";

import styles from "./MainLayout.module.css";


export function MainLayout() {
    return (
        <div className={styles["root-layout"]}>
            <Header />

            <Outlet />

            <Footer />
        </div>
    );
}


