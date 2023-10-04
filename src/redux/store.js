import { configureStore } from '@reduxjs/toolkit';
import { logoutReducer } from './reducers/auth/logoutSlice';
import { registerReducer } from './reducers/auth/registerSlice';
import { loginReducer } from './reducers/auth/loginSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
  },
});

export default store;
