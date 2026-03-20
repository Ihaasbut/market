// import { useState } from "react";
// import ShowMore from "@/shared/ui/ShowMore";
import { useReviewList } from "../../model/ReviewList";
import {  type CommentData } from "../CommentCard/CommentCard";
// import { CommentForm } from "../CommentForm/CommentForm";
import { ReviewCard, type ReviewData } from "../ReviewCard/ReviewCard";

import styles from "./ReviewList.module.css";

export type ReviewComments = {
    review: ReviewData;
    comments: CommentData[];
};

export type ReviewListProps = {
    reviews: ReviewComments[];
};

// const COMMENTS_PORTION = 3;

export function ReviewList({ reviews }: ReviewListProps) {
    const { certainReviewKey, toggleComments, answerPerson } =
        useReviewList();

//     const [visibleCountByReview, setVisibleCountByReview] = useState<
//         Record<string, number>
//     >({});

//     const handleShowMore = (reviewKey: string, total: number) => {
//         setVisibleCountByReview((prev) => {
//             const current =
//                 prev[reviewKey] ?? Math.min(COMMENTS_PORTION, total);
//             const next = Math.min(current + COMMENTS_PORTION, total);
//             return { ...prev, [reviewKey]: next };
//         });
//     };

    return (
        <div className={styles["review-list"]}>
            {reviews.map((reviewOne: ReviewComments, idx) => {
                const { comments, review } = reviewOne;
                const reviewKey = `${review.firstName}-${review.lastName}-${review.date}-${idx}`;

          //       const totalComments = comments.length;

          //       const visibleCount =
          //           visibleCountByReview[reviewKey] ??
          //           Math.min(COMMENTS_PORTION, totalComments);

          //       const visibleComments = comments.slice(-visibleCount);
                
          //       const remaining = totalComments - visibleCount;

                return (
                    <div key={reviewKey}>
                        <ReviewCard
                            countComments={comments.length}
                            reviewData={review}
                            fnReply={() =>
                                answerPerson(
                                    review.firstName,
                                    review.lastName,
                                    reviewKey,
                                )
                            }
                            fnToggle={() => toggleComments(reviewKey)}
                        />
                        {certainReviewKey === reviewKey ? (
                            <div className={styles["review-comment"]}>
                                {/* {remaining > 0 ? (
                                    <ShowMore
                                        count={remaining}
                                        onClick={() =>
                                            handleShowMore(
                                                reviewKey,
                                                totalComments,
                                            )
                                        }
                                    />
                                ) : null} */}

                                {/* <div className={styles["comments"]}>
                                    {visibleComments.map((comment, idx) => (
                                        <CommentCard
                                            key={`${comment.firstName}-${comment.lastName}-${comment.date}-${idx}`}
                                            comment={comment}
                                            fnReply={() =>
                                                answerPerson(
                                                    comment.firstName,
                                                    comment.lastName,
                                                    reviewKey,
                                                )
                                            }
                                        />
                                    ))}
                                </div> */}

                                {/* <CommentForm
                                    key={
                                        replyTo
                                            ? `${replyTo.name}-${replyTo.female}`
                                            : "default"
                                    }
                                    replyTo={replyTo}
                                /> */}
                            </div>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
}
