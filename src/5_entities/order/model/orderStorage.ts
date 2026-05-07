import {
    DEFAULT_ORDER_STATUS,
    type DemoOrder,
    type PlacedOrderCheckout,
} from "./types";

const STORAGE_PREFIX = "market_orders_v1:";

function storageKey(email: string): string {
    return `${STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

function normalizeOrder(raw: unknown): DemoOrder | null {
    if (!raw || typeof raw !== "object") return null;
    const o = raw as Record<string, unknown>;
    if (typeof o.id !== "string" || typeof o.orderNumber !== "string") {
        return null;
    }
    if (typeof o.placedAt !== "number") return null;
    if (!Array.isArray(o.lines)) return null;
    const lines = o.lines
        .map((line): DemoOrder["lines"][number] | null => {
            if (!line || typeof line !== "object") return null;
            const l = line as Record<string, unknown>;
            if (typeof l.productId !== "number" || typeof l.count !== "number") {
                return null;
            }
            return {
                productId: l.productId,
                title: typeof l.title === "string" ? l.title : `Product #${l.productId}`,
                image: typeof l.image === "string" ? l.image : "",
                count: l.count,
                unitPrice: typeof l.unitPrice === "number" ? l.unitPrice : 0,
                lineTotal: typeof l.lineTotal === "number" ? l.lineTotal : 0,
            };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

    const c = o.checkout;
    if (!c || typeof c !== "object") return null;
    const ck = c as Record<string, unknown>;
    if (
        typeof ck.firstName !== "string" ||
        typeof ck.lastName !== "string" ||
        typeof ck.phone !== "string" ||
        typeof ck.email !== "string" ||
        typeof ck.deliveryMethod !== "string" ||
        typeof ck.paymentMethod !== "string" ||
        typeof ck.comment !== "string"
    ) {
        return null;
    }

    return {
        id: o.id,
        orderNumber: o.orderNumber,
        placedAt: o.placedAt,
        status:
            typeof o.status === "string" && o.status.length > 0
                ? o.status
                : DEFAULT_ORDER_STATUS,
        lines,
        subtotal: typeof o.subtotal === "number" ? o.subtotal : 0,
        shippingUsd: typeof o.shippingUsd === "number" ? o.shippingUsd : 0,
        total: typeof o.total === "number" ? o.total : 0,
        checkout: {
            firstName: ck.firstName,
            lastName: ck.lastName,
            phone: ck.phone,
            email: ck.email,
            address: typeof ck.address === "string" ? ck.address : "",
            deliveryMethod: ck.deliveryMethod as PlacedOrderCheckout["deliveryMethod"],
            paymentMethod: ck.paymentMethod as PlacedOrderCheckout["paymentMethod"],
            comment: ck.comment,
        },
    };
}

function readPersistedList(email: string): DemoOrder[] {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(storageKey(email));
    if (!raw) return [];
    try {
        const parsed = JSON.parse(raw) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed
            .map(normalizeOrder)
            .filter((x): x is DemoOrder => x !== null);
    } catch {
        return [];
    }
}

export function loadOrdersForUser(email: string): DemoOrder[] {
    return readPersistedList(email);
}

export function saveOrdersForUser(email: string, orders: DemoOrder[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(storageKey(email), JSON.stringify(orders));
}
