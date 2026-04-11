import ArrowReply from "@/shared/assets/icon/ArrowReply";
import { Typography } from "@/shared/ui/Typography";
import styles from "./ReplyButton.module.scss";

export type ReplyButtonProps = {
    onClick: () => void;
};

export function ReplyButton({ onClick }: ReplyButtonProps) {
    return (
        <button className={styles["action"]} onClick={onClick}>
            <ArrowReply />
            <Typography variant="body-s" as={"p"}>
                Ответить
            </Typography>
        </button>
    );
}


