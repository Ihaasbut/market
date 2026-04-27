import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    clearDemoUser,
    getDemoUser,
    saveDemoUser,
    type DemoUser,
} from "../lib/portfolioMockAuth";

export type AuthState = {
    user: DemoUser | null;
    error: string | null;
};

const initialState: AuthState = {
    user: getDemoUser(),
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async (email: string, { rejectWithValue }) => {
        const trimmed = email.trim();
        try {
            saveDemoUser(trimmed);
            const user = getDemoUser();
            if (!user) {
                return rejectWithValue("Could not save session");
            }
            return user;
        } catch {
            return rejectWithValue("Sign-in failed");
        }
    },
);

export const registerUser = createAsyncThunk(
    "auth/register",
    async (email: string, { rejectWithValue }) => {
        const trimmed = email.trim();
        try {
            saveDemoUser(trimmed);
            const user = getDemoUser();
            if (!user) {
                return rejectWithValue("Could not save session");
            }
            return user;
        } catch {
            return rejectWithValue("Sign-up failed");
        }
    },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    clearDemoUser();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error =
                    (action.payload as string) ??
                    action.error.message ??
                    "Sign-in failed";
            })
            .addCase(registerUser.pending, (state) => {
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error =
                    (action.payload as string) ??
                    action.error.message ??
                    "Sign-up failed";
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.error = null;
            });
    },
});

export const { clearAuthError } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (auth: AuthState) => auth.user;
export const selectAuthError = (auth: AuthState) => auth.error;
