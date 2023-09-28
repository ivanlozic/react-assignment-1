import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './reducers/authSlice';

export interface RootState {
  auth: AuthState;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
