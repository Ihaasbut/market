import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { loadCartState } from "./cartStorage";
import type { CartItem, CartState } from "./types";

export type { CartItem, CartState } from "./types";

const initialState: CartState = loadCartState() ?? {
    itemsById: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<CartItem>,
        ) => {
            const { id, count } = action.payload;
            const existingCartProduct = state.itemsById.find(
                (cartProduct) => cartProduct.id === id,
            );
            if (existingCartProduct) {
                existingCartProduct.count += count;
            } else {
                state.itemsById.push(action.payload);
            }
        },
        incrementCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const cartProduct = state.itemsById.find(
                (cartEntry) => cartEntry.id === id,
            );
            if (cartProduct) {
                cartProduct.count += 1;
            }
        },
        decrementCartItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const cartProduct = state.itemsById.find(
                (cartEntry) => cartEntry.id === id,
            );
            if (!cartProduct || cartProduct.count < 1) {
                return;
            }
            if (cartProduct.count === 1) {
                state.itemsById = state.itemsById.filter(
                    (entry) => entry.id !== id,
                );
            } else {
                cartProduct.count -= 1;
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.itemsById = state.itemsById.filter(
                (cartProduct) => cartProduct.id !== id,
            );
        },
        updateCartItemSnapshot: (
            state,
            action: PayloadAction<
                Pick<
                    CartItem,
                    "id" | "title" | "image" | "price" | "discountPercentage"
                >
            >,
        ) => {
            const item = state.itemsById.find(
                (cartProduct) => cartProduct.id === action.payload.id,
            );
            if (!item) {
                return;
            }

            item.title = action.payload.title;
            item.image = action.payload.image;
            item.price = action.payload.price;
            item.discountPercentage = action.payload.discountPercentage;
        },
        clearCart: (state) => {
            state.itemsById = [];
        },
    },
});

export const {
    addToCart,
    incrementCartItem,
    decrementCartItem,
    removeFromCart,
    updateCartItemSnapshot,
    clearCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

export const selectCartItems = (cart: CartState) => cart.itemsById;

export const selectCartTotalQuantity = (cart: CartState) =>
    cart.itemsById.reduce(
        (totalUnits, cartProduct) => totalUnits + cartProduct.count,
        0,
    );

export const selectCartItemActiveCount = (
    cart: CartState,
    productId: number,
): number => {
    const item = cart.itemsById.find(
        (cartEntry) => cartEntry.id === productId,
    );
    if (!item || item.count < 1) {
        return 0;
    }
    return item.count;
};
