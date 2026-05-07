import cn from "classnames";

import { TitleSection } from "@/shared/ui/TitleSection";
import { Typography } from "@/shared/ui/Typography";

import styles from "./InformationPage.module.scss";

export function DeliveryPage() {
    return (
        <div className={cn("container", styles.page)}>
            <TitleSection className={styles.headline}>Delivery</TitleSection>

            <div className={styles.intro}>
                <Typography variant="body-s" className={styles.leadText} as="p">
                    We dispatch orders Monday through Saturday from our New York fulfilment
                    hub. Estimated delivery ranges below count business days once your
                    payment has cleared.
                </Typography>
            </div>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    United States — standard
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    USPS or FedEx Ground: three to six business days to the contiguous
                    forty-eight states. Alaska, Hawaii, and remote ZIP codes typically add
                    two to eight extra days—we show a narrower window at checkout whenever
                    the carrier publishes one for your postcode.
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Order before 14:00 Eastern Time on a shipping day for same-day fulfilment.
                    Larger kits (multi-monitor bundles or multiple laptops) may need an extra
                    picking day; we notify you automatically if dispatch slips.
                </Typography>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Express options
                </Typography>
                <ul className={styles.list}>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Two-business-day expedited anywhere FedEx Economy delivers in the US.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body-m" as="p" className={styles.bodyText}>
                            Overnight to most metropolitan areas—cutoff 13:30 Eastern Monday
                            through Friday, excluding carriers&apos; blackout dates printed on our
                            checkout banner.
                        </Typography>
                    </li>
                </ul>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Freight and signature
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Orders over eighty pounds ship LTL pallet freight; scheduling is coordinated
                    by SMS and email once the pallet label is booked. Devices over $1,499 ship with
                    adult signature required by default—you can waive that in your account checkout
                    preferences at your own risk.
                </Typography>
            </section>

            <section className={styles.section}>
                <Typography variant="h4" as="h3" className={styles.sectionTitle}>
                    Tracking and customs
                </Typography>
                <Typography variant="body-m" as="p" className={styles.bodyText}>
                    Tracking links activate when the carton is scanned leaving our warehouse. Rare
                    cross-border parcels (dropship components) attach commercial invoices inside the
                    carton; customs delays are outside our control but we will reship or refund per
                    our buyer protection timeline if transit stalls beyond thirty-one days with no
                    customs release.
                </Typography>
            </section>

            <div className={styles.note}>
                <Typography variant="body-m" as="p" className={styles.noteText}>
                    Delivery fees quoted at checkout are locked for paid orders—we never add
                    surcharges after checkout unless you change the carrier or shipping address before
                    dispatch.
                </Typography>
            </div>
        </div>
    );
}
