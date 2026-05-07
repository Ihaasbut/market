import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { loginUser, logoutUser } from "@/features/auth";
import { CART_DELIVERY_USD } from "@/entities/cart/model/cartDelivery";
import { removeFromCart } from "@/entities/cart/model/cartSlice";
import type { CartItem } from "@/entities/cart/model/types";
import { readPersistedDemoUserEmail } from "@/shared/lib/demoAuthSession";
import { payableUnitPrice } from "@/shared/ui/ProductPrice";

import {
    loadOrdersForUser,
    saveOrdersForUser,
} from "./orderStorage";
import type {
    DemoOrder,
    DemoOrderLine,
    OrderState,
    PlacedOrderCheckout,
} from "./types";
import { CANCELLED_ORDER_STATUS, DEFAULT_ORDER_STATUS } from "./types";

export type { DemoOrder, DemoOrderLine, PlacedOrderCheckout } from "./types";
export { CANCELLED_ORDER_STATUS, DEFAULT_ORDER_STATUS } from "./types";

function newOrderId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function loadInitialOrders(): DemoOrder[] {
    const email = readPersistedDemoUserEmail();
    if (!email) {
        return [];
    }
    return loadOrdersForUser(email);
}

const initialState: OrderState = {
    orders: loadInitialOrders(),
};

export const placeDemoOrder = createAsyncThunk<
    DemoOrder,
    { items: CartItem[]; checkout: PlacedOrderCheckout },
    { state: RootState }
>(
    "orders/placeDemo",
    async (
        payload: { items: CartItem[]; checkout: PlacedOrderCheckout },
        { getState, dispatch },
    ) => {
        const user = getState().auth.user;
        if (!user) {
            throw new Error("Not signed in");
        }
        const activeItems = payload.items.filter((item) => item.count > 0);
        if (activeItems.length === 0) {
            throw new Error("Cart is empty");
        }
        const lines: DemoOrderLine[] = activeItems.map((item) => {
            const unitPrice = payableUnitPrice(item.price, item.discountPercentage);
            return {
                productId: item.id,
                title: item.title,
                image: item.image,
                count: item.count,
                unitPrice,
                lineTotal: unitPrice * item.count,
            };
        });
        const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
        const shippingUsd = CART_DELIVERY_USD;
        const order: DemoOrder = {
            id: newOrderId(),
            orderNumber: String(Math.floor(100000 + Math.random() * 900000)),
            placedAt: Date.now(),
            status: DEFAULT_ORDER_STATUS,
            lines,
            subtotal,
            shippingUsd,
            total: subtotal + shippingUsd,
            checkout: payload.checkout,
        };
        const existing = loadOrdersForUser(user.email);
        saveOrdersForUser(user.email, [order, ...existing]);
        for (const item of activeItems) {
            dispatch(removeFromCart(item.id));
        }
        return order;
    },
);

export const cancelDemoOrder = createAsyncThunk<
    string,
    string,
    { state: RootState }
>(
    "orders/cancelDemo",
    async (orderId, { getState }) => {
        const user = getState().auth.user;
        if (!user) {
            throw new Error("Not signed in");
        }
        const orders = getState().order.orders;
        const target = orders.find((o) => o.id === orderId);
        if (!target) {
            throw new Error("Order not found");
        }
        if (target.status === CANCELLED_ORDER_STATUS) {
            throw new Error("Already cancelled");
        }
        const updated = orders.map((o) =>
            o.id === orderId
                ? { ...o, status: CANCELLED_ORDER_STATUS }
                : o,
        );
        saveOrdersForUser(user.email, updated);
        return orderId;
    },
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.orders = loadOrdersForUser(action.payload.email);
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.orders = [];
            })
            .addCase(placeDemoOrder.fulfilled, (state, action) => {
                state.orders.unshift(action.payload);
            })
            .addCase(cancelDemoOrder.fulfilled, (state, action) => {
                const id = action.payload;
                const order = state.orders.find((o) => o.id === id);
                if (order) {
                    order.status = CANCELLED_ORDER_STATUS;
                }
            });
    },
});

export const orderReducer = orderSlice.reducer;

export const selectOrders = (state: RootState) => state.order.orders;

export const selectOrderById = (
    state: RootState,
    orderId: string,
): DemoOrder | undefined =>
    state.order.orders.find((o) => o.id === orderId);
