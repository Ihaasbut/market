import { ReviewForm } from "@/entities/reviews";
import {
    ReviewList,
    type ReviewListProps,
} from "@/entities/reviews/ui/ReviewList/ReviewList";
import styles from "./ReviewPanel.module.css";

const testDataFull: ReviewListProps = {
    reviews: [
        {
            review: {
                firstName: "Диана",
                lastName: "Полевова",

                date: "24 сентября, 2024",
                rating: 2,
                feedback: "Я заебалась делать эту хуйню",
            },
            comments: [
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "Согласен!",
                },
            ],
        },
        {
            review: {
                firstName: "Диана",
                lastName: "Полевова",

                date: "24 сентября, 2024",
                rating: 2,
                feedback: "Я заебалась делать эту хуйню",
            },
            comments: [
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "1!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "2!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "3!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "4!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "5!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "6!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "7!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "8!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "9!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "10!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "11!",
                },
            ],
        },
        {
            review: {
                firstName: "Диана",
                lastName: "Полевова",

                date: "24 сентября, 2024",
                rating: 1,
                feedback: "Держись!",
            },
            comments: [
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "Согласен!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "Согласен!",
                },
                {
                    firstName: "Поле",
                    lastName: "Михайлов",
                    date: "25 сентября, 2024",
                    text: "Согласен!",
                },
            ],
        },
    ],
};

export function ReviewPanel() {
    return (
        <div className="container">
            <div className={styles["review-panel"]}>
                <ReviewList reviews={testDataFull.reviews} />
                <ReviewForm />
            </div>
        </div>
    );
}
