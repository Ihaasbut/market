import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "market_recently_viewed_product_ids_v1";
const STORAGE_EVENT = "market_recently_viewed_product_ids_update";
const DEFAULT_LIMIT = 9;

function normalizeIds(raw: unknown): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    return [...new Set(raw.filter((id): id is number => typeof id === "number"))];
}

function readRecentlyViewedIds(): number[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? normalizeIds(JSON.parse(raw)) : [];
    } catch {
        return [];
    }
}

function writeRecentlyViewedIds(ids: number[]): void {
    if (typeof window === "undefined") {
        return;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useRecentlyViewedProductIds({
    excludeProductId,
    limit = DEFAULT_LIMIT,
}: {
    excludeProductId?: number;
    limit?: number;
} = {}): number[] {
    const [ids, setIds] = useState(() => readRecentlyViewedIds());

    useEffect(() => {
        const updateIds = () => setIds(readRecentlyViewedIds());

        window.addEventListener(STORAGE_EVENT, updateIds);
        window.addEventListener("storage", updateIds);

        return () => {
            window.removeEventListener(STORAGE_EVENT, updateIds);
            window.removeEventListener("storage", updateIds);
        };
    }, []);

    return useMemo(
        () => ids.filter((id) => id !== excludeProductId).slice(0, limit),
        [excludeProductId, ids, limit],
    );
}

export function useTrackRecentlyViewedProductId(productId?: number): void {
    useEffect(() => {
        if (productId == null) {
            return;
        }

        const nextIds = [
            productId,
            ...readRecentlyViewedIds().filter((id) => id !== productId),
        ].slice(0, DEFAULT_LIMIT);

        writeRecentlyViewedIds(nextIds);
    }, [productId]);
}
