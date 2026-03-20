export type UseCommentsToggleButtonProps = {
    countComments: number;
};

export function useCommentsToggleButton({
    countComments,
}: UseCommentsToggleButtonProps) {
    const getCommentsText = () => {
        if (countComments % 100 >= 11 && countComments % 100 <= 19) {
            return `${countComments} комментариев`;
        }
        if (countComments % 10 === 1) {
            return `${countComments} комментарий`;
        }
        if (countComments % 10 >= 2 && countComments % 10 <= 4) {
            return `${countComments} комментария`;
        }
        return `${countComments} комментариев`;
    };

    return {
        commentsText: getCommentsText(),
    };
}
