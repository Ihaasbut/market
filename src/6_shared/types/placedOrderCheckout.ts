/** Checkout form payload stored on a placed demo order (single source of truth for Zod + entity). */
export type PlacedOrderCheckout = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    deliveryMethod: "post" | "sdek";
    paymentMethod: "card_on_delivery" | "cash_on_delivery";
    comment: string;
};
