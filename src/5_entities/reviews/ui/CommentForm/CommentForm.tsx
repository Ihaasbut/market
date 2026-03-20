import {
    useCommentForm,
} from "@/entities/reviews/model/CommentForm";
import styles from "./CommentForm.module.css";

export type ReplyToTheUser = { name: string; female: string } | null;

export type CommentFormProps = {
    replyTo?: { name: string; female: string } | null;
};

export function CommentForm({ replyTo }: CommentFormProps) {
    const { userInput, onSubmitForm, onChangeTextarea } =
        useCommentForm(replyTo);

    return (
        <form className={styles["comment-form"]} onSubmit={onSubmitForm}>
            <textarea
                placeholder={
                    replyTo
                        ? `Ответить ${replyTo.name} ${replyTo.female}`
                        : "Написать комментарий"
                }
                onChange={onChangeTextarea}
                value={userInput}
            />
            <button>Отправить</button>
        </form>
    );
}
