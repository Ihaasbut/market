import { ReviewForm } from "@/entities/reviews";
import type { ProductDetail } from "@/shared/api/api.types";
import { Stars } from "@/shared/ui/Stars";
import { Typography } from "@/shared/ui/Typography";

import styles from "./ProductDetailReviews.module.scss";

export type ProductDetailReviewsProps = {
    product: ProductDetail;
};

export function ProductDetailReviews({ product }: ProductDetailReviewsProps) {
    const reviews = product.reviews ?? [];

    return (
        <div className={styles["root"]}>
            <div className={styles["colReviews"]}>
                <Typography variant="h5" className={styles["blockTitle"]}>
                    Reviews
                    {reviews.length > 0 && (
                        <span className={styles["count"]}>
                            {" "}
                            ({reviews.length})
                        </span>
                    )}
                </Typography>

                {reviews.length === 0 ? (
                    <div className={styles["emptyBox"]}>
                        <Typography variant="body-l" className={styles["empty"]}>
                            No reviews yet — be the first to leave one using the
                            form.
                        </Typography>
                    </div>
                ) : (
                    <ul className={styles["list"]}>
                        {reviews.map((review, index) => (
                            <li
                                key={`${review.reviewerEmail}-${review.date}-${index}`}
                                className={styles["item"]}
                            >
                                <div className={styles["head"]}>
                                    <Typography
                                        variant="body-s"
                                        className={styles["author"]}
                                    >
                                        {review.reviewerName}
                                    </Typography>
                                    <Stars rating={review.rating} />
                                </div>
                                <Typography
                                    variant="body-xs"
                                    className={styles["date"]}
                                >
                                    {review.date}
                                </Typography>
                                <Typography
                                    variant="body-l"
                                    className={styles["comment"]}
                                >
                                    {review.comment}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className={styles["colForm"]}>
                <ReviewForm />
            </div>
        </div>
    );
}

export default ProductDetailReviews;
