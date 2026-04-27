import type { CartItem, CartState } from "./types";

const STORAGE_KEY = "market_cart_v1";

type PersistedCartV1 = {
    itemsById?: CartItem[];
    excludedFromSummary?: unknown;
};

function readPersisted(): PersistedCartV1 | null {
    if (typeof window === "undefined") {
        return null;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
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

function writePersisted(payload: {
    itemsById: CartItem[];
    excludedFromSummary: number[];
}): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        console.error(error);
    }
}

export function loadCartState(): CartState | null {
    const parsed = readPersisted();
    if (!parsed) {
        return null;
    }

    return {
        itemsById: normalizeItems(parsed?.itemsById),
    };
}
/** Ids позиций, снятых с «учёта в сумме» (чекбоксы в корзине). */
export function loadCartExcludedFromSummary(): number[] {
    const parsed = readPersisted();

    return normalizeExcludedIds(parsed?.excludedFromSummary);
}

export function saveCartState(state: CartState): void {
    if (typeof window === "undefined") {
        return;
    }
    try {
        const prev = readPersisted();
        const itemIds = new Set(state.itemsById.map((item) => item.id));
        const excluded = normalizeExcludedIds(
            prev?.excludedFromSummary,
        ).filter((id) => itemIds.has(id));

        writePersisted({
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
    if (typeof window === "undefined") {
        return;
    }
    const itemIds = new Set(items.map((item) => item.id));
    const excluded = excludedFromSummary.filter((id) => itemIds.has(id));

    try {
        writePersisted({
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
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error(error);
    }
}
