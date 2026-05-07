import type { PlacedOrderCheckout } from "@/shared/types/placedOrderCheckout";

/** Default demo order status copy shown in the UI */
export const DEFAULT_ORDER_STATUS = "Processing";

/** Shown after the user cancels an order on the orders list */
export const CANCELLED_ORDER_STATUS = "Cancelled";

export type { PlacedOrderCheckout };

export type DemoOrderLine = {
    productId: number;
    title: string;
    image: string;
    count: number;
    unitPrice: number;
    lineTotal: number;
};

export type DemoOrder = {
    id: string;
    orderNumber: string;
    placedAt: number;
    status: string;
    lines: DemoOrderLine[];
    subtotal: number;
    shippingUsd: number;
    total: number;
    checkout: PlacedOrderCheckout;
};

export type OrderState = {
    orders: DemoOrder[];
};
