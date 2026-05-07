const shortDate: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
};

const dateAndTime: Intl.DateTimeFormatOptions = {
    ...shortDate,
    hour: "2-digit",
    minute: "2-digit",
};

/** Order list / cards (date only). */
export function formatOrderDate(placedAt: number): string {
    return new Date(placedAt).toLocaleDateString(undefined, shortDate);
}

/** Order detail (date + time). */
export function formatOrderDateTime(placedAt: number): string {
    return new Date(placedAt).toLocaleString(undefined, dateAndTime);
}
