import CommentIcon from "@/shared/assets/icon/CommentIcon";
import styles from "./OpenCommentReview.module.css";
import { Typography } from "@/shared/ui/Typography";

export function OpenCommentReview() {
    const count = 5;
    return (
        <button className={styles["action"]}>
            <CommentIcon />
            <Typography variant="body-s" as={"p"}>
                {count}&nbsp;Комментарии
            </Typography>
        </button>
    );
}
