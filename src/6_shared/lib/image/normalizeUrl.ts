export const normalizeImageUrl = (
    rawUrl: string | undefined | null,
): string => {
    if (!rawUrl) return "";

    try {
        const url = new URL(rawUrl);

        url.pathname = url.pathname
            .split("/")
            .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
            .join("/");

        return url.toString();
    } catch {
        return rawUrl.replace(/ /g, "%20").replace(/'/g, "%27");
    }
};

export const cssBackgroundImageUrl = (
    rawUrl: string | undefined | null,
): string => {
    const u = normalizeImageUrl(rawUrl);
    if (!u) return "none";
    return `url(${JSON.stringify(u)})`;
};
