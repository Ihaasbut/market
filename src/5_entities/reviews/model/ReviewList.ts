import { useState } from "react";

export type ReplyTo = {
    name: string;
    female: string;
} | null;

export function useReviewList() {
    const [replyTo, setReplyTo] = useState<ReplyTo>(null);
    const [certainReviewKey, setCertainReviewKey] = useState<string | null>(null);

    const toggleComments = (reviewKey: string) => {
        setCertainReviewKey((prev) => (prev === reviewKey ? null : reviewKey));
        setReplyTo(null);
    };

    const answerPerson = (name: string, female: string, reviewKey: string) => {
        setCertainReviewKey(reviewKey);
        setReplyTo({ name, female });
    };

    return {
        replyTo,
        certainReviewKey,
        toggleComments,
        answerPerson,
    };
}