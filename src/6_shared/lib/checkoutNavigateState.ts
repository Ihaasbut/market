/** Passed from cart → `/cart/checkout` via `<Link state={…} />` */
export type CheckoutNavigateState = {
    checkoutProductIds: number[];
};
