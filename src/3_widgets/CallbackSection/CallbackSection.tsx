import { CallbackForm } from "@/features/forms/ui/CallbackForm";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";
import styles from "./CallbackSection.module.css";

export function CallbackSection() {
    return (
        <section className={styles["section-wrapper"]}>
            <div className="container">
                <div className={styles["inner"]}>
                    <TitleSection>Мы Вам перезвоним</TitleSection>
                    <Typography variant="body-s" className={styles["text"]}>
                        Если у вас возникли какие-то вопросы или проблемы,
                        заполните форму и мы Вам перезвоним.
                    </Typography>
                    <CallbackForm />
                </div>
            </div>
        </section>
    );
}
