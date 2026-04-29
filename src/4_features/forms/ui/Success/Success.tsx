import { useEffect, useId } from "react";
import successForm from "@/shared/assets/images/successForm.png";
import { Button } from "@/shared/ui/Button";
import { Typography } from "@/shared/ui/Typography";
import styles from "./Success.module.scss";

export type SuccessProps = {
    title: string;
    text: string;
    onclick: () => void;
};

export function Success({ title, text, onclick }: SuccessProps) {
    const titleId = useId();
    const textId = useId();

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onclick();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onclick]);

    return (
        <div
            className={styles["wrapper"]}
            role="presentation"
            onClick={onclick}
        >
            <div
                className={styles["inner"]}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={textId}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={successForm}
                    alt=""
                    className={styles["image-success"]}
                />
                <Typography
                    variant="body-l"
                    className={styles["title"]}
                    id={titleId}
                >
                    {title}
                </Typography>
                <Typography variant="default" className={styles["text"]} id={textId}>
                    {text}
                </Typography>
                <Button variant="fill" onclick={onclick}>
                    Okay
                </Button>
            </div>
        </div>
    );
}
