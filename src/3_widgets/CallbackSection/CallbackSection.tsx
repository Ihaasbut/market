import { CallbackForm } from "@/features/forms/ui/CallbackForm";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";
import styles from "./CallbackSection.module.css";

export function CallbackSection() {
    return (
        <section className={styles["section-wrapper"]}>
            <div className="container">
                <div className={styles["inner"]}>
                    <TitleSection>We'll call you back.</TitleSection>
                    <Typography variant="body-s" className={styles["text"]}>
                    If you have any questions or problems, please fill out the form and we'll call you back.
                    </Typography>
                    <CallbackForm />
                </div>
            </div>
        </section>
    );
}
