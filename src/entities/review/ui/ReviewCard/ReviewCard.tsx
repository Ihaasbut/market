import { Typography } from "@/shared/ui/Typography";
import styles from "./ReviewCard.module.css";
import { Stars } from "@/shared/ui/Stars";
import type { ReviewCardI } from "../../model/review-card.types";

export function ReviewCard({
    firstName,
    secondName,
    date,
    rating,
    text,
}: ReviewCardI) {
    return (
        <div className={styles["review-card"]}>
            <div className={styles["header"]}>
                <Typography
                    variant="h5"
                    as={"p"}
                    className={styles["data-person"]}
                >
                    {firstName} {secondName}
                </Typography>
                <Typography
                    variant="body-l"
                    as={"p"}
                    className={styles["date"]}
                >
                    {date}
                </Typography>
                <Stars rating={rating} />
            </div>
            <div className={styles["content"]}>
                <Typography variant="body-s" as={"p"}>
                    {text}
                </Typography>

                <div className={styles["actions"]}>
                    <button>Ответить</button>
                    <button>Комментарй</button>
                </div>
            </div>
        </div>
    );
}
