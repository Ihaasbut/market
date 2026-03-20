import type React from "react";
import starsFill from "@/shared/assets/images/starsFill.png";
import starsOutside from "@/shared/assets/images/starsOutside.png";
import styles from "./Stars.module.css";
import type { StarsI } from "./stars.types";

export function Stars({ rating }: StarsI) {
    const STAR_SIZE = 20;
    const STAR_GAP = 6;
    const FULL_WIDTH = 124;
    const STAR_STEP = STAR_SIZE + STAR_GAP;

    const isInteger = rating % 1 === 0;

    let sumPixelForStar;

    if (isInteger) {
        if (rating === 5) {
            sumPixelForStar = FULL_WIDTH;
        }
        sumPixelForStar = rating * STAR_STEP;
    } else {
        const rounded = Math.floor(rating);
        const difference = Number((rating - rounded).toFixed(1));

        if (difference * 10 > 8) {
            sumPixelForStar =
                rounded * STAR_STEP + difference * (STAR_SIZE - STAR_GAP);
            console.log(sumPixelForStar);
        } else if (difference * 10 <= 3) {
            sumPixelForStar =
                rounded * STAR_STEP + difference * (STAR_SIZE + STAR_GAP);
            console.log(sumPixelForStar);
        } else {
            sumPixelForStar = rounded * STAR_STEP + difference * STAR_SIZE;
            console.log(sumPixelForStar);
        }
    }

    return (
        <div
            className={styles["stars"]}
            style={
                {
                    "--stars-bg": `url(${starsFill})`,
                    "--current-rating": `${sumPixelForStar}px`,
                } as React.CSSProperties
            }
        >
            <img
                src={starsOutside}
                alt="Звезды рейтинга"
                className={styles["stars-default"]}
            />
        </div>
    );
}
