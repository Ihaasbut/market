import styles from "./ShowMore.module.css";

export type ShowMoreProps = {
    onClick: () => void;
    count: number;
};

function ShowMore({ onClick, count }: ShowMoreProps) {
    return (
        <button className={styles["show-more-button"]} onClick={onClick}>
            {" "}
            Показать еще({count})
        </button>
    );
}

export default ShowMore;
