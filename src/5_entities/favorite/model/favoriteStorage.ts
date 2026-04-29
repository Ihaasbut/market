import { readPersistedDemoUserEmail } from "@/shared/lib/demoAuthSession";
import { DEMO_LEGACY_STORAGE_OWNER_EMAIL } from "@/shared/lib/demoLegacyMigration";

import type { FavoriteItem, FavoriteState } from "./types";

const LEGACY_STORAGE_KEY = "market_favorites_v1";
const STORAGE_PREFIX = "market_favorites_v1:";

type PersistedFavoritesV1 = {
    items?: unknown;
    ids?: unknown;
    excludedFromBulk?: unknown;
};

function favoriteStorageKey(email: string): string {
    return `${STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

function readRawForEmail(email: string): string | null {
    if (typeof window === "undefined") {
        return null;
    }
    const key = favoriteStorageKey(email);
    let raw = localStorage.getItem(key);
    if (!raw) {
        const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (
            legacy &&
            email.trim().toLowerCase() ===
                DEMO_LEGACY_STORAGE_OWNER_EMAIL.toLowerCase()
        ) {
            localStorage.setItem(key, legacy);
            localStorage.removeItem(LEGACY_STORAGE_KEY);
            raw = legacy;
        }
    }
    return raw;
}

function readPersistedForEmail(email: string): PersistedFavoritesV1 | null {
    const raw = readRawForEmail(email);
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

function writePersistedForEmail(email: string, payload: PersistedFavoritesV1): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        localStorage.setItem(favoriteStorageKey(email), JSON.stringify(payload));
    } catch (error) {
        console.error(error);
    }
}

export function loadFavoriteStateForUser(email: string): FavoriteState | null {
    const parsed = readPersistedForEmail(email);
    if (!parsed) {
        return null;
    }

    const items = normalizeItems(parsed.items);
    if (items.length > 0) {
        return { items };
    }

    return {
        items: normalizeIds(parsed.ids).map((id) => ({
            id,
            title: `Product #${id}`,
            image: "",
        })),
    };
}

export function loadFavoriteState(): FavoriteState | null {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return null;
    }
    return loadFavoriteStateForUser(email);
}

export function loadFavoriteExcludedFromBulkForUser(email: string): number[] {
    const parsed = readPersistedForEmail(email);
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

export function loadFavoriteExcludedFromBulk(): number[] {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return [];
    }
    return loadFavoriteExcludedFromBulkForUser(email);
}

export function saveFavoriteState(state: FavoriteState): void {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return;
    }
    try {
        const prev = readPersistedForEmail(email);
        const ids = state.items.map((item) => item.id);
        const idSet = new Set(ids);
        const prevExcluded = normalizeBulkExcluded(
            prev?.excludedFromBulk,
            idSet,
        );

        writePersistedForEmail(email, {
            items: state.items,
            ids,
            excludedFromBulk: prevExcluded,
        });
    } catch (error) {
        console.error(error);
    }
}

export function syncFavoriteBulkSelectionToStorage(
    items: FavoriteItem[],
    excludedFromBulk: number[],
): void {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return;
    }
    const ids = items.map((item) => item.id);
    const idSet = new Set(ids);
    const excluded = excludedFromBulk.filter((id) => idSet.has(id));

    try {
        writePersistedForEmail(email, {
            items,
            ids,
            excludedFromBulk: excluded,
        });
    } catch (error) {
        console.error(error);
    }
}
