import { readPersistedDemoUserEmail } from "@/shared/lib/demoAuthSession";
import { DEMO_LEGACY_STORAGE_OWNER_EMAIL } from "@/shared/lib/demoLegacyMigration";

import type { CartItem, CartState } from "./types";

const LEGACY_STORAGE_KEY = "market_cart_v1";
const STORAGE_PREFIX = "market_cart_v1:";

type PersistedCartV1 = {
    itemsById?: CartItem[];
    excludedFromSummary?: unknown;
};

function cartStorageKey(email: string): string {
    return `${STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

function readRawForEmail(email: string): string | null {
    if (typeof window === "undefined") {
        return null;
    }
    const key = cartStorageKey(email);
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

function readPersistedForEmail(email: string): PersistedCartV1 | null {
    const raw = readRawForEmail(email);
    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as PersistedCartV1;
    } catch {
        return null;
    }
}

function normalizeExcludedIds(raw: unknown): number[] {
    if (!Array.isArray(raw)) {
        return [];
    }

    const ids = raw.filter((x): x is number => typeof x === "number");

    return [...new Set(ids)];
}

function normalizeItems(list: unknown): CartItem[] {
    if (!(list instanceof Array)) {
        return [];
    }

    return list
        .map((storedCartProduct): CartItem | null =>
            typeof storedCartProduct?.id === "number" &&
            typeof storedCartProduct?.count === "number" &&
            storedCartProduct.count >= 0
                ? {
                      id: storedCartProduct.id,
                      count: storedCartProduct.count,
                      title:
                          typeof storedCartProduct.title === "string"
                              ? storedCartProduct.title
                              : `Product #${storedCartProduct.id}`,
                      image:
                          typeof storedCartProduct.image === "string"
                              ? storedCartProduct.image
                              : "",
                      price:
                          typeof storedCartProduct.price === "number"
                              ? storedCartProduct.price
                              : 0,
                      discountPercentage:
                          typeof storedCartProduct.discountPercentage ===
                          "number"
                              ? storedCartProduct.discountPercentage
                              : 0,
                  }
                : null,
        )
        .filter(
            (cartProduct): cartProduct is CartItem => cartProduct !== null,
        );
}

function writePersistedForEmail(
    email: string,
    payload: {
        itemsById: CartItem[];
        excludedFromSummary: number[];
    },
): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        localStorage.setItem(cartStorageKey(email), JSON.stringify(payload));
    } catch (error) {
        console.error(error);
    }
}

/** Корзина для конкретного email (логин / смена пользователя). */
export function loadCartStateForUser(email: string): CartState | null {
    const parsed = readPersistedForEmail(email);
    if (!parsed) {
        return null;
    }

    return {
        itemsById: normalizeItems(parsed?.itemsById),
    };
}

export function loadCartState(): CartState | null {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return null;
    }
    return loadCartStateForUser(email);
}

export function loadCartExcludedFromSummaryForUser(email: string): number[] {
    const parsed = readPersistedForEmail(email);

    return normalizeExcludedIds(parsed?.excludedFromSummary);
}

export function loadCartExcludedFromSummary(): number[] {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return [];
    }
    return loadCartExcludedFromSummaryForUser(email);
}

export function saveCartState(state: CartState): void {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return;
    }
    try {
        const prev = readPersistedForEmail(email);
        const itemIds = new Set(state.itemsById.map((item) => item.id));
        const excluded = normalizeExcludedIds(
            prev?.excludedFromSummary,
        ).filter((id) => itemIds.has(id));

        writePersistedForEmail(email, {
            itemsById: state.itemsById,
            excludedFromSummary: excluded,
        });
    } catch (error) {
        console.error(error);
    }
}

export function syncCartSummarySelectionToStorage(
    items: CartItem[],
    excludedFromSummary: number[],
): void {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return;
    }
    const itemIds = new Set(items.map((item) => item.id));
    const excluded = excludedFromSummary.filter((id) => itemIds.has(id));

    try {
        writePersistedForEmail(email, {
            itemsById: normalizeItems(items),
            excludedFromSummary: excluded,
        });
    } catch (error) {
        console.error(error);
    }
}

export function clearCartStorage(): void {
    if (typeof window === "undefined") return;
    try {
        const email = readPersistedDemoUserEmail();
        if (email) {
            localStorage.removeItem(cartStorageKey(email));
        } else {
            localStorage.removeItem(LEGACY_STORAGE_KEY);
        }
    } catch (error) {
        console.error(error);
    }
}
