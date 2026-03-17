import StarFill from "@/shared/assets/icon/StarFill";
import styles from "./Stars.module.css";
import type { StarsI } from "./stars.types";
import StarOutside from "@/shared/assets/icon/StarOutside";

export function Stars({ rating }: StarsI) {
    const ratingMax = 5;
    return (
        <div className={styles["stars"]}>
            {Array.from({ length: rating }).map((_, index) => (
                <StarFill key={index} />
            ))}

            {Array.from({ length: ratingMax - rating }).map((_, index) => (
                <StarOutside key={index} />
            ))}
        </div>
    );
}
