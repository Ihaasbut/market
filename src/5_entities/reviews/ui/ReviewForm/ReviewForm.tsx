import { useId, useState } from "react";

import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ReviewForm.module.scss";

export function ReviewForm() {
    const ratingId = useId();
    const [rating, setRating] = useState(3);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    }

    return (
        <form className={styles["form"]} onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" className={styles["title"]}>
                Write a review
            </Typography>

            <div className={styles["field"]}>
                <label className={styles["label"]} htmlFor={ratingId}>
                    Rating
                </label>
                <div className={styles["ratingBlock"]}>
                    <Stars rating={rating} />
                    <input
                        id={ratingId}
                        className={styles["ratingRange"]}
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        aria-valuemin={1}
                        aria-valuemax={5}
                        aria-valuenow={rating}
                    />
                    <Typography
                        variant="body-xs"
                        className={styles["ratingValue"]}
                    >
                        {rating} of 5
                    </Typography>
                </div>
            </div>

            <label className={styles["field"]}>
                <span className={styles["label"]}>Name</span>
                <input
                    className={styles["input"]}
                    name="name"
                    type="text"
                    placeholder="How should we address you"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                />
            </label>

            <label className={styles["field"]}>
                <span className={styles["label"]}>Email</span>
                <input
                    className={styles["input"]}
                    name="email"
                    type="email"
                    placeholder="For replies to your review"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
            </label>

            <label className={styles["field"]}>
                <span className={styles["label"]}>Comment</span>
                <textarea
                    className={styles["textarea"]}
                    name="comment"
                    placeholder="Share your experience with this product"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={5}
                />
            </label>

            <div className={styles["actions"]}>
                <button type="submit" className={styles["submit"]}>
                    Submit
                </button>
            </div>
        </form>
    );
}
