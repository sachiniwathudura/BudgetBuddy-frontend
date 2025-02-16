import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    // Add more user properties as needed
}

interface AuthState {
    user: User | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("userInfo") || "null"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
        },
    },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
