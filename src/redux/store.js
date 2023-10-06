import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';
import tradeDetailsReducer from './reducers/tradeDetailsSlice';
import usersReducer from './reducers/usersSlice';
import { logoutReducer } from './reducers/auth/logoutSlice';
import { registerReducer } from './reducers/auth/registerSlice';
import { loginReducer } from './reducers/auth/loginSlice';
import reserveReducer from './reducers/reserveSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
    tradeDetails: tradeDetailsReducer,
    users: usersReducer,
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    reserve: reserveReducer,
  },
});

export default store;
