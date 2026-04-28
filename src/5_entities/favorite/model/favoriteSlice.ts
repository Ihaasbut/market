import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { loadFavoriteState } from "./favoriteStorage";
import type { FavoriteItem, FavoriteState } from "./types";

export type { FavoriteItem, FavoriteState } from "./types";

const initialState: FavoriteState = loadFavoriteState() ?? {
    items: [],
};

const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
            const item = action.payload;
            if (!state.items.some((x) => x.id === item.id)) {
                state.items.push(item);
            }
        },
        removeFromFavorites: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.items = state.items.filter((x) => x.id !== id);
        },
        removeFavoritesByIds: (state, action: PayloadAction<number[]>) => {
            const remove = new Set(action.payload);
            state.items = state.items.filter((item) => !remove.has(item.id));
        },
        updateFavoriteItemSnapshot: (
            state,
            action: PayloadAction<FavoriteItem>,
        ) => {
            const i = state.items.findIndex(
                (item) => item.id === action.payload.id,
            );
            if (i >= 0) {
                state.items[i] = action.payload;
            }
        },
        toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            const item = action.payload;
            const i = state.items.findIndex((x) => x.id === item.id);
            if (i >= 0) {
                state.items.splice(i, 1);
            } else {
                state.items.push(item);
            }
        },
        clearFavorites: (state) => {
            state.items = [];
        },
    },
});

export const {
    addToFavorites,
    removeFromFavorites,
    removeFavoritesByIds,
    updateFavoriteItemSnapshot,
    toggleFavorite,
    clearFavorites,
} = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;

export const selectFavoriteItems = (s: FavoriteState) => s.items;

export const selectFavoriteIds = (s: FavoriteState) =>
    s.items.map((item) => item.id);

export const selectIsFavorite = (s: FavoriteState, productId: number) =>
    s.items.some((item) => item.id === productId);
