import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer';
import updateReducer from './updateUserReducer';

export interface RootState {
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: updateReducer,
});

export default rootReducer;
