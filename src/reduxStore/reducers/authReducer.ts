import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../constants/interfaces';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};


const authReducer = createSlice({
  name: 'auth',
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

export const userLoggedIn = authReducer.actions.loginUser;
export const userLoggedOut = authReducer.actions.logoutUser;

export default authReducer.reducer;
