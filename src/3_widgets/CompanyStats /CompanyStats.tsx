import { Typography } from "@/shared/ui/Typography";
import styles from "./CompanyStats.module.css";

export type CompanyStat = {
    description: string;
    number: string;
};

export type CompanyStatsProps = {
    stats: CompanyStat[];
};

export function CompanyStats({ stats }: CompanyStatsProps) {
    return (
        <section className={styles["section-stats"]}>
            <div className="container">
                <div className={styles["list"]}>
                    {stats.map((stat, index) => (
                        <div
                            className={styles["item"]}
                            key={index + stat.description}
                        >
                            <Typography
                                variant="h4"
                                className={styles["number"]}
                            >
                                {stat.number}
                            </Typography>
                            <Typography
                                variant="body-s"
                                className={styles["text"]}
                            >
                                {stat.description}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CompanyStats;
