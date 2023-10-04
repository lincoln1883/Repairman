import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';
import usersReducer from './reducers/usersSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
    users: usersReducer,
  },
});

export default store;
