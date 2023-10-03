// tradesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  trades: [],
  loading: false,
  error: null,
};

export const fetchTrades = createAsyncThunk('trades/fetchTrades', async () => {
  const response = await axios.get('http://localhost:3001/api/v1/trades/');
  console.log(response.data);
  return response.data;
});

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradesSlice.reducer;

// Commented out the unused export statement to resolve linting error
// export { fetchTrades };
