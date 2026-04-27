import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authReducer } from "@/features/auth";
import { cartReducer } from "@/entities/cart/model/cartSlice";
import { saveCartState } from "@/entities/cart/model/cartStorage";
import { favoriteReducer } from "@/entities/favorite/model/favoriteSlice";
import { saveFavoriteState } from "@/entities/favorite/model/favoriteStorage";
import { api } from "@/shared/api/api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        favorite: favoriteReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

let lastCartJson = JSON.stringify(store.getState().cart);
let lastFavoriteJson = JSON.stringify(store.getState().favorite);
store.subscribe(() => {
    const cart = store.getState().cart;
    const cartJson = JSON.stringify(cart);
    if (cartJson !== lastCartJson) {
        lastCartJson = cartJson;
        saveCartState(cart);
    }

    const favorite = store.getState().favorite;
    const favoriteJson = JSON.stringify(favorite);
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
