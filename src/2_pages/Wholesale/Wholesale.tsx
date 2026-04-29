import cn from "classnames";

import { SiteLeadForm } from "@/widgets/forms/SiteLeadForm";
import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";

import styles from "./Wholesale.module.scss";

export function Wholesale() {
    return (
        <>
            <div className={cn("container", styles.page)}>
                <TitleSection className={styles.headline}>
                    Wholesale
                </TitleSection>

                <div className={styles.intro}>
                    <Typography variant="body-s" className={styles.leadText} as="p">
                        Partner with us for bulk orders of laptops, accessories,
                        and electronics. We offer stable pricing, predictable lead
                        times, and a dedicated flow for businesses, retailers, and
                        procurement teams.
                    </Typography>
                </div>

                <section className={styles.section}>
                    <Typography
                        variant="h4"
                        as="h3"
                        className={styles.sectionTitle}
                    >
                        What you get
                    </Typography>
                    <ul className={styles.list}>
                        <li>
                            <Typography
                                variant="body-m"
                                as="p"
                                className={styles.bodyText}
                            >
                                Volume pricing tiers aligned with your order size
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                variant="body-m"
                                as="p"
                                className={styles.bodyText}
                            >
                                Consolidated invoicing and repeatable assortments
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                variant="body-m"
                                as="p"
                                className={styles.bodyText}
                            >
                                Priority handling once your account is verified
                            </Typography>
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <Typography
                        variant="h4"
                        as="h3"
                        className={styles.sectionTitle}
                    >
                        How it works
                    </Typography>
                    <Typography variant="body-m" as="p" className={styles.bodyText}>
                        Share your company details, typical monthly volume, and product
                        mix. We review requirements, confirm availability and commercial
                        terms, then unlock wholesale pricing on eligible lines. First
                        orders may require a minimum quantity per SKU or category—we will
                        spell that out before you commit.
                    </Typography>
                </section>

                <div className={styles.note}>
                    <Typography variant="body-m" as="p" className={styles.noteText}>
                        Fill out the form below and we will contact you to discuss
                        wholesale terms within two business days.
                    </Typography>
                </div>
            </div>
            <SiteLeadForm />
        </>
    );
}
