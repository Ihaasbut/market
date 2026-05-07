import { CallbackForm } from "@/features/forms/ui/CallbackForm";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";
import styles from "./SiteLeadForm.module.scss";

export function SiteLeadForm() {
    return (
        <section className={styles.root}>
            <div className="container">
                <div className={styles.inner}>
                    <TitleSection>We'll call you back.</TitleSection>
                    <Typography variant="body-s" className={styles.text}>
                        If you have any questions or problems, please fill out
                        the form and we&apos;ll call you back.
                    </Typography>
                    <div className={styles.formWrap}>
                        <CallbackForm />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SiteLeadForm;
