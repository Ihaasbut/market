import CommentIcon from "@/shared/assets/icon/CommentIcon";
import { Typography } from "@/shared/ui/Typography";
import { useCommentsToggleButton } from "../../model/CommentsToggleButton";
import styles from "./CommentsToggleButton.module.scss";

export type CommentsToggleButtonProps = {
    fnToggle: () => void;
    countComments: number;
};

export function CommentsToggleButton({
    fnToggle,
    countComments,
}: CommentsToggleButtonProps) {
    const { commentsText } = useCommentsToggleButton({ countComments });

    return (
        <button className={styles["action"]} onClick={fnToggle}>
            <CommentIcon />
            <Typography variant="body-s" as={"p"}>
                {commentsText}
            </Typography>
        </button>
    );
}
