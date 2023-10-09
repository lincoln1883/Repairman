import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';
import tradeDetailsReducer from './reducers/tradeDetailsSlice';
import { logoutReducer } from './reducers/auth/logoutSlice';
import { registerReducer } from './reducers/auth/registerSlice';
import { loginReducer } from './reducers/auth/loginSlice';
import { reserveReducer } from './reducers/resereveSlice';
import { reservationReducer } from './reducers/rservationSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
    tradeDetails: tradeDetailsReducer,
    register: registerReducer,
    login: loginReducer,
    logout: logoutReducer,
    reservations: reservationReducer,
    reserve: reserveReducer,
  },
});

export default store;
