import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';
import tradeDetailsReducer from './reducers/tradeDetailsSlice';
import usersReducer from './reducers/usersSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
    tradeDetails: tradeDetailsReducer,
    users: usersReducer,
  },
});

export default store;
