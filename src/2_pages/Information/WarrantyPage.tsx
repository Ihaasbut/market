import cn from "classnames";

import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";

import styles from "./InformationPage.module.scss";

export function WarrantyPage() {
    return (
        <div className={cn("container", styles.page)}>
            <TitleSection className={styles.headline}>Warranty</TitleSection>

            <div className={styles.intro}>
                <Typography variant="body-s" className={styles.leadText} as="p">
                    All new electronics from Golden Soft are covered by a limited
                    warranty against defects in materials and workmanship. This page
                    explains what is covered, for how long, and how to get help.
                </Typography>
            </div>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Coverage period
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Laptops and all-in-one systems: twenty-four months from the date of
                    purchase registered on our receipt or your order confirmation.
                    Displays, peripherals, docks, keyboards, mice, chargers, cables, and
                    similar accessories purchased together with a main unit: twelve
                    months unless a longer term is printed on your invoice or the product
                    packaging.
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Extended warranty bundles (when offered at checkout) add coverage
                    for accidental drops and liquid spills for the term described in the
                    add-on description; those terms apply in addition to the standard
                    limited warranty rules below.
                </Typography>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    What is covered
                </Typography>
                <ul className={styles.list}>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Factory defects that appear under normal home or office use
                            and that we can reproduce or verify with diagnostics.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Repair or replacement, at our option, using new or refurbished
                            parts of comparable performance.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Return shipping labels for warranty claims we approve within
                            the contiguous United States.
                        </Typography>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    What is not covered
                </Typography>
                <ul className={styles.list}>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Cosmetic damage, lost data, removable batteries past their normal
                            wear window, unauthorized repairs, BIOS or firmware flashes not
                            recommended by Golden Soft support.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Damage from floods, fires, mains surges outside our optional
                            surge-protection offer, misuse, neglect, theft, or commercial
                            rental fleet use unless you hold a matching B2B service
                            contract.
                        </Typography>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    How to make a claim
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Email support@goldensoft.com with your order number, serial number(s),
                    a short issue description, and photos if visible damage is involved.
                    We usually reply within one business day with an RMA number and shipping
                    instructions if the claim falls under warranty.
                </Typography>
            </section>

            <div className={styles.note}>
                <Typography variant="body-m" as="p" className={styles.noteText}>
                    Consumer protection laws in your state may grant rights beyond this
                    summary—nothing here limits statutory guarantees where they apply.
                </Typography>
            </div>
        </div>
    );
}
