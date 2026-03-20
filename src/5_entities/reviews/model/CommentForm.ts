import {
    useEffect,
    useState,
    type ChangeEvent,
    type SyntheticEvent,
} from "react";
import type { ReplyToTheUser } from "../ui/CommentForm/CommentForm";

export function useCommentForm(replyTo?: ReplyToTheUser) {
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        if (replyTo) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUserInput(`${replyTo.name} ${replyTo.female}, `);
        }
    }, [replyTo]);

    const onSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userInput);
    };

    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    return { userInput, onSubmitForm, onChangeTextarea };
}
