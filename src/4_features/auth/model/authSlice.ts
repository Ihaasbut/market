import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import {
    clearDemoUser,
    getDemoUser,
    hydrateDemoUserFromStorage,
    isDemoLoginCredentials,
    saveDemoUser,
    writeDemoUser,
    type DemoUser,
} from "../lib/portfolioMockAuth";

export type LoginCredentials = {
    email: string;
    password: string;
};

export type AuthState = {
    user: DemoUser | null;
    error: string | null;
};

type UserProfileUpdate = {
    firstName?: string;
    lastName?: string;
    phone?: string;
};

const initialState: AuthState = {
    user: hydrateDemoUserFromStorage(),
    error: null,
};

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
        const trimmed = email.trim();
        if (!isDemoLoginCredentials(trimmed, password)) {
            return rejectWithValue("Invalid email or password");
        }
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
    async (_email: string, { rejectWithValue }) => {
        return rejectWithValue(
            "Registration is not available in this demo. Please sign in.",
        );
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
        updateUserProfile: (state, action: PayloadAction<UserProfileUpdate>) => {
            if (!state.user) return;
            const next: DemoUser = {
                ...state.user,
                ...action.payload,
                email: state.user.email,
            };
            state.user = next;
            writeDemoUser(next);
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

export const { clearAuthError, updateUserProfile } = authSlice.actions;
export const authReducer = authSlice.reducer;

export const selectAuthUser = (auth: AuthState) => auth.user;
export const selectAuthError = (auth: AuthState) => auth.error;
