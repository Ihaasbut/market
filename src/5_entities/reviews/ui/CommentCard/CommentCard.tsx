import { Typography } from "@/shared/ui/Typography";
import { ReplyButton } from "../ReplyButton/ReplyButton";
import styles from "./CommentCard.module.css";

export interface CommentData {
    firstName: string;
    lastName: string;
    date: string;
    text: string;
}

export interface CommentCardProps {
    comment: CommentData;
    fnReply: () => void;
}

export function CommentCard({ fnReply, comment }: CommentCardProps) {
    const { firstName, lastName, date, text } = comment;
    return (
        <div className={styles["comment-card"]}>
            <div className={styles["text-header"]}>
                <Typography
                    variant="h5"
                    as={"p"}
                    className={styles["data-person"]}
                >
                    {firstName} {lastName}
                </Typography>

                <Typography
                    variant="body-l"
                    as={"p"}
                    className={styles["date"]}
                >
                    {date}
                </Typography>
            </div>

            <div className={styles["content"]}>
                <Typography variant="body-s" as={"p"}>
                    {text}
                </Typography>
                <ReplyButton onClick={fnReply} />
            </div>
        </div>
    );
}
