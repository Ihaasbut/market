import { useEffect, useMemo, useState } from "react";
import { selectAuthUser } from "@/features/auth";
import { DEMO_LEGACY_STORAGE_OWNER_EMAIL } from "@/shared/lib/demoLegacyMigration";
import { useAppSelector } from "@/shared/store";

const LEGACY_STORAGE_KEY = "market_recently_viewed_product_ids_v1";
const STORAGE_PREFIX = "market_recently_viewed_product_ids_v1:";
const STORAGE_EVENT = "market_recently_viewed_product_ids_update";
const DEFAULT_LIMIT = 9;

function scopedStorageKey(email: string): string {
    return `${STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

function normalizeIds(raw: unknown): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    return [...new Set(raw.filter((id): id is number => typeof id === "number"))];
}

function readRawForUser(email: string): string | null {
    if (typeof window === "undefined") {
        return null;
    }
    const key = scopedStorageKey(email);
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

export function readRecentlyViewedIdsForUser(email: string): number[] {
    if (typeof window === "undefined") {
        return [];
    }
    try {
        const raw = readRawForUser(email);
        return raw ? normalizeIds(JSON.parse(raw)) : [];
    } catch {
        return [];
    }
}

function writeRecentlyViewedIdsForUser(email: string, ids: number[]): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        localStorage.setItem(
            scopedStorageKey(email),
            JSON.stringify(ids),
        );
        window.dispatchEvent(new Event(STORAGE_EVENT));
    } catch {
        /* ignore quota */
    }
}

export function useRecentlyViewedProductIds({
    excludeProductId,
    limit = DEFAULT_LIMIT,
}: {
    excludeProductId?: number;
    limit?: number;
} = {}): number[] {
    const userEmail =
        useAppSelector((s) => selectAuthUser(s.auth)?.email) ?? null;

    const [storageEpoch, setStorageEpoch] = useState(0);

    const ids = useMemo(() => {
        void storageEpoch;
        if (!userEmail) {
            return [];
        }
        return readRecentlyViewedIdsForUser(userEmail);
    }, [userEmail, storageEpoch]);

    useEffect(() => {
        const bump = () => setStorageEpoch((v) => v + 1);

        window.addEventListener(STORAGE_EVENT, bump);
        window.addEventListener("storage", bump);

        return () => {
            window.removeEventListener(STORAGE_EVENT, bump);
            window.removeEventListener("storage", bump);
        };
    }, []);

    return useMemo(
        () => ids.filter((id) => id !== excludeProductId).slice(0, limit),
        [excludeProductId, ids, limit],
    );
}

export function useTrackRecentlyViewedProductId(productId?: number): void {
    const userEmail =
        useAppSelector((s) => selectAuthUser(s.auth)?.email) ?? null;

    useEffect(() => {
        if (productId == null || !userEmail) {
            return;
        }

        const nextIds = [
            productId,
            ...readRecentlyViewedIdsForUser(userEmail).filter(
                (id) => id !== productId,
            ),
        ].slice(0, DEFAULT_LIMIT);

        writeRecentlyViewedIdsForUser(userEmail, nextIds);
    }, [productId, userEmail]);
}
