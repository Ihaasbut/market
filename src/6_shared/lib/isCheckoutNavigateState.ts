import type { CheckoutNavigateState } from "./checkoutNavigateState";

/**
 * Runtime check for `location.state` from React Router (it is `unknown`).
 * Lets TypeScript narrow the type and avoids crashes if state is missing or malformed
 * (direct URL, bookmark, or older app versions).
 */
export function isCheckoutNavigateState(
    value: unknown,
): value is CheckoutNavigateState {
    if (!value || typeof value !== "object") return false;
    const ids = (value as CheckoutNavigateState).checkoutProductIds;
    if (!Array.isArray(ids)) return false;
    return ids.every((id) => typeof id === "number" && Number.isFinite(id));
}
