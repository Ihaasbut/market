import type { FavoriteItem, FavoriteState } from "./types";

const STORAGE_KEY = "market_favorites_v1";

type PersistedFavoritesV1 = {
    items?: unknown;
    ids?: unknown;
    excludedFromBulk?: unknown;
};

function readPersisted(): PersistedFavoritesV1 | null {
    if (typeof window === "undefined") {
        return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as PersistedFavoritesV1;
    } catch {
        return null;
    }
}

function normalizeIds(raw: unknown): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    const ids = raw.filter((x): x is number => typeof x === "number");

    return [...new Set(ids)];
}

function normalizeItems(raw: unknown): FavoriteItem[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    const seen = new Set<number>();
    const items: FavoriteItem[] = [];

    for (const x of raw) {
        if (
            typeof x === "object" &&
            x !== null &&
            "id" in x &&
            "title" in x &&
            "image" in x &&
            typeof x.id === "number" &&
            typeof x.title === "string" &&
            typeof x.image === "string" &&
            !seen.has(x.id)
        ) {
            seen.add(x.id);
            items.push({
                id: x.id,
                title: x.title,
                image: x.image,
            });
        }
    }

    return items;
}

function normalizeBulkExcluded(raw: unknown, validIds: Set<number>): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    return raw.filter(
        (x): x is number => typeof x === "number" && validIds.has(x),
    );
}

export function loadFavoriteState(): FavoriteState | null {
    const parsed = readPersisted();
    if (!parsed) {
        return null;
    }

    const items = normalizeItems(parsed.items);
    if (items.length > 0) {
        return { items };
    }

    return {
        // Migration from old storage shape: keep ids, fallback title until product is re-added.
        items: normalizeIds(parsed.ids).map((id) => ({
            id,
            title: `Product #${id}`,
            image: "",
        })),
    };
}

export function loadFavoriteExcludedFromBulk(): number[] {
    const parsed = readPersisted();
    if (!parsed?.ids && !parsed?.items) {
        return [];
    }

    const parsedItems = normalizeItems(parsed.items);
    const ids =
        parsedItems.length > 0
            ? parsedItems.map((item) => item.id)
            : normalizeIds(parsed.ids);
    const idSet = new Set(ids);

    return normalizeBulkExcluded(parsed.excludedFromBulk, idSet);
}

export function saveFavoriteState(state: FavoriteState): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        const prev = readPersisted();
        const ids = state.items.map((item) => item.id);
        const idSet = new Set(ids);
        const prevExcluded = normalizeBulkExcluded(
            prev?.excludedFromBulk,
            idSet,
        );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                items: state.items,
                ids,
                excludedFromBulk: prevExcluded,
            }),
        );
    } catch (error) {
        console.error(error);
    }
}

export function syncFavoriteBulkSelectionToStorage(
    items: FavoriteItem[],
    excludedFromBulk: number[],
): void {
    if (typeof window === "undefined") {
        return;
    }
    const ids = items.map((item) => item.id);
    const idSet = new Set(ids);
    const excluded = excludedFromBulk.filter((id) => idSet.has(id));

    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                items,
                ids,
                excludedFromBulk: excluded,
            }),
        );
    } catch (error) {
        console.error(error);
    }
}
