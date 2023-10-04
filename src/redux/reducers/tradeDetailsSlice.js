import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  trade: null, // Store the details of a specific trade
  loading: false,
  error: null,
};

export const fetchTradeDetails = createAsyncThunk(
  'tradeDetails/fetchTradeDetails',
  async (tradeId) => {
    const response = await axios.get(
      `http://localhost:3001/api/v1/trades/${tradeId}`,
    );
    return response.data;
  },
);

const tradeDetailsSlice = createSlice({
  name: 'tradeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.trade = action.payload;
      })
      .addCase(fetchTradeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradeDetailsSlice.reducer;
