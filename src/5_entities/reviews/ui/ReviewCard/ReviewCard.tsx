import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";

// import { CommentsToggleButton } from "../CommentsToogleButton/CommentsToggleButton";
// import { ReplyButton } from "../ReplyButton/ReplyButton";
import styles from "./ReviewCard.module.scss";

export interface ReviewData {
    firstName: string;
    lastName: string;
    date: string;
    rating: number;
    feedback: string;
}

export interface ReviewCardProps {
    reviewData: ReviewData;
    fnToggle?: () => void;
    fnReply?: () => void;
    countComments?: number;
}

export function ReviewCard({ reviewData }: ReviewCardProps) {
    const { firstName, lastName, date, rating, feedback } = reviewData;

    return (
        <>
            <div className={styles["review-card"]}>
                <div className={styles["header"]}>
                    <div className={styles["text-header"]}>
                        <Typography
                            variant="h5"
                            className={styles["data-person"]}
                        >
                            {firstName} {lastName}
                        </Typography>

                        <Typography variant="body-l" className={styles["date"]}>
                            {date}
                        </Typography>
                    </div>
                    <div className={styles["stars-review"]}>
                        <Stars rating={rating} />
                    </div>
                </div>

                <div className={styles["content"]}>
                    <Typography variant="body-s" as={"p"}>
                        {feedback}
                    </Typography>
                    {/* <div className={styles["buttons"]}>
                        <ReplyButton onClick={fnReply} />
                        <CommentsToggleButton fnToggle={fnToggle} countComments={countComments} />
                    </div> */}
                </div>
            </div>
        </>
    );
}
