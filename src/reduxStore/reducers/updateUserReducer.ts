import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../constants/interfaces';
import { initialState } from './authReducer';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const updateReducer = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const userUpdated = updateReducer.actions.updateUser;
export default updateReducer.reducer;
