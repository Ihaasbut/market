import ArrowReply from "@/shared/assets/icon/ArrowReply";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ReplyReviewButton.module.css";

export function ReplyReviewButton() {
    return (
        <button className={styles["action"]}>
            <ArrowReply />
            <Typography variant="body-s" as={"p"}>
                Ответить
            </Typography>
        </button>
    );
}
