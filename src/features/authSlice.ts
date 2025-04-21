import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../app/services/authAPI";
import { RootState } from "../app/store";
import { User } from "../app/types";
import { userApi } from "../app/services/userAPI";

type InitialState = {
    isAuthenticated: boolean;
    token?: string;
    current: User | null;
};

const getInitialState = (): InitialState => ({
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || undefined,
    current: null
});

const initialState = getInitialState();

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("token");
            const newState = getInitialState();
            return newState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                const token = action.payload.token;
                state.token = token;
                state.isAuthenticated = true;
            })
            .addMatcher(userApi.endpoints.getCurrentUser.matchFulfilled, (state, action) => {
                state.current = action.payload;
            });
    }
});

export default slice.reducer;

export const { logout } = slice.actions;

export const selectCurrent = (state: RootState) => state.auth.current
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;