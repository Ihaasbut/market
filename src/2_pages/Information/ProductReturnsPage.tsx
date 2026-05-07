import cn from "classnames";

import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";

import styles from "./InformationPage.module.scss";

export function ProductReturnsPage() {
    return (
        <div className={cn("container", styles.page)}>
            <TitleSection className={styles.headline}>Product returns</TitleSection>

            <div className={styles.intro}>
                <Typography variant="body-s" className={styles.leadText} as="p">
                    We want you to be confident ordering from Golden Soft. If something is
                    wrong or simply not right for your setup, you can return qualifying
                    merchandise within the window below without hassle.
                </Typography>
            </div>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Thirty-day satisfaction window
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Most products in factory-sealed condition may be returned within thirty calendar
                    days of delivery for store credit or a refund to the original payment method.
                    Accessories opened but unused with all retail tags still attached follow the same
                    policy; consumables (thermal paste tube opened once, earbuds with broken blister pack)
                    cannot be refunded.
                </Typography>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Restocking exceptions
                </Typography>
                <ul className={styles.list}>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Custom CTO configurations engraved or loaded with prepaid software bundles:
                            refundable only under warranty defect or outbound shipping mistake.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Open-box bargains marked &quot;final sale&quot; on the product sheet are not eligible
                            for discretionary returns—they remain fully covered while under warranty.
                        </Typography>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    What to send back
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Pack the unit in the original inner foam and outer carton whenever possible.
                    Include all cables, dongles, documentation, and bonus accessories that shipped
                    with the order. Missing items may reduce your refund by our replacement cost
                    list current on the day we inspect the return.
                </Typography>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    How to start a return
                </Typography>
                <ol className={styles.list}>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Sign in, open the order, and click &quot;Start return&quot;—or email
                            support@goldensoft.com with your order number.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Print the prepaid label we email you (US contiguous standard returns;
                            international customers receive commercial invoice copies they may use
                            with the carrier of their choice and we reimburse up to the domestic
                            flat rate cap once the item is received).
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            After inspection (usually two business days), refunds post within five
                            banking days; store credit is instant to your wallet balance.
                        </Typography>
                    </li>
                </ol>
            </section>

            <div className={styles.note}>
                <Typography variant="body-m" as="p" className={styles.noteText}>
                    Defective units inside the warranty period follow the warranty process first;
                    if we cannot repair or replace within a reasonable time, you may elect a
                    refund instead at no return-shipping cost to you.
                </Typography>
            </div>
        </div>
    );
}
