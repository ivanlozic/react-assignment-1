import { createSlice } from "@reduxjs/toolkit";
import { User } from "../constants/interfaces";


  export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
  }
  
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
  };
  
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
