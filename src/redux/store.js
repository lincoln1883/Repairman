import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './reducers/tradesSlice';

const store = configureStore({
  reducer: {
    trades: tradesReducer,
  },
});

export default store;
