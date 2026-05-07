import styles from "./ShowMore.module.scss";

export type ShowMoreProps = {
    onClick: () => void;
    count: number;
};

function ShowMore({ onClick, count }: ShowMoreProps) {
    return (
        <button className={styles["show-more-button"]} onClick={onClick}>
            Show more ({count})
        </button>
    );
}

export default ShowMore;
