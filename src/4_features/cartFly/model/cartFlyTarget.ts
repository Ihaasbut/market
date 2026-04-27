export const CART_FLY_TARGET_ATTR = "data-cart-fly-target";

export function findVisibleCartTarget(): HTMLElement | null {
    const nodes = document.querySelectorAll<HTMLElement>(
        `a[${CART_FLY_TARGET_ATTR}]`,
    );
    for (const el of nodes) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
            return el;
        }
    }
    return null;
}
