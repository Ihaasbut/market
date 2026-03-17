import styles from "./MainLayout.module.css";
import { Outlet } from "react-router-dom";
import {Footer} from "@/widgets/Footer";
import { Header } from "@/widgets/Header";


function MainLayout() {
    return (
        <div className={styles["root-layout"]}>
            <Header/>

            <Outlet />

            <Footer />
        </div>
    );
}

export default MainLayout;
