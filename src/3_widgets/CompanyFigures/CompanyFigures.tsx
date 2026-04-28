import { Typography } from "@/shared/ui/Typography";

import styles from "./CompanyFigures.module.scss";
import { DEFAULT_COMPANY_FIGURES, type CompanyFigure } from "./model";

export type CompanyFiguresProps = {
    figures?: CompanyFigure[];
};

export function CompanyFigures({
    figures = DEFAULT_COMPANY_FIGURES,
}: CompanyFiguresProps) {
    return (
        <section className={styles.root}>
            <div className="container">
                <div className={styles.list}>
                    {figures.map((figure, index) => (
                        <div
                            className={styles.item}
                            key={index + figure.description}
                        >
                            <Typography
                                variant="h4"
                                className={styles.number}
                            >
                                {figure.number}
                            </Typography>
                            <Typography
                                variant="body-s"
                                className={styles.text}
                            >
                                {figure.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CompanyFigures;
