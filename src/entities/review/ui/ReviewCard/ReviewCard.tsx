import { Typography } from "@/shared/ui/Typography";
import styles from "./ReviewCard.module.css";
import { Stars } from "@/shared/ui/Stars";
import type { ReviewCardProps } from "../../model/review-card.types";

import { OpenCommentReview } from "@/features/review-comment/ui/OpenCommentReview/OpenCommentReview";
import { ReplyReviewButton } from "@/features/review-comment/ui/ReplyReviewButton/ReplyReviewButton";

export function ReviewCard(props: ReviewCardProps) {
    const { firstName, secondName, date, rating, text } = props;

    return (
        <div className={styles["review-card"]}>
            <div className={styles["header"]}>
                <div className={styles["text-header"]}>
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
                </div>
                <div className={styles["stars-review"]}>
                    <Stars rating={rating} />
                </div>
            </div>

            <div className={styles["content"]}>
                <Typography variant="body-s" as={"p"}>
                    {text}
                </Typography>

                <div className={styles["actions"]}>
                    <ReplyReviewButton />
                    <OpenCommentReview />
                </div>
            </div>
        </div>
    );
}
