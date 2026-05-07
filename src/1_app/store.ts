import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "@/features/auth";
import { cartReducer } from "@/entities/cart/model/cartSlice";
import { saveCartState } from "@/entities/cart/model/cartStorage";
import { favoriteReducer } from "@/entities/favorite/model/favoriteSlice";
import { saveFavoriteState } from "@/entities/favorite/model/favoriteStorage";
import { orderReducer } from "@/entities/order/model/orderSlice";
import { api } from "@/shared/api/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
        favorite: favoriteReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

let lastCartJson = JSON.stringify(store.getState().cart);
let lastFavoriteJson = JSON.stringify(store.getState().favorite);

store.subscribe(() => {
    const state = store.getState();
    const cart = state.cart;
    const favorite = state.favorite;
    const cartJson = JSON.stringify(cart);
    const favoriteJson = JSON.stringify(favorite);

    if (!state.auth.user) {
        lastCartJson = cartJson;
        lastFavoriteJson = favoriteJson;
        return;
    }

    if (cartJson !== lastCartJson) {
        lastCartJson = cartJson;
        saveCartState(cart);
    }

    if (favoriteJson !== lastFavoriteJson) {
        lastFavoriteJson = favoriteJson;
        saveFavoriteState(favorite);
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

declare global {
    type RootState = ReturnType<typeof store.getState>;
    type AppDispatch = typeof store.dispatch;
}
