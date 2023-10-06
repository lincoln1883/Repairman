// tradesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/trades`;
const initialState = {
  trades: [],
  loading: false,
  error: null,
};

export const addTrades = createAsyncThunk('trades/AddTrades', async (add) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.post(BASE_URL, add,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

const token = JSON.parse(localStorage.getItem('token'));

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const fetchTrades = createAsyncThunk('trades/fetchTrades', async (includeRemoved = false) => {
  const response = await axios.get(BASE_URL);

  let trades = [];

  // If include removed is false, filter the data to include only trades with removed = false
  if (includeRemoved) {
    trades = response.data;
  } else {
    trades = response.data.filter((trade) => trade.removed === false);
  }
  return trades;
});

// this action creator is used to update the removed field of a trade (toogling the remove button)
export const updateRemoveTrade = createAsyncThunk(
  'trades/updatedTrade',
  async ({ id, removed }) => {
    // makes a PUT request to the API to update the trade
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await axios.put(`${BASE_URL}/${id}`, {
      removed,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
);

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrades.fulfilled, (state, action) => {
        const {
          name, description, image, price, duration, location, tradeType, userId,
        } = action.payload;

        const newTrade = {
          name,
          description,
          image,
          price,
          duration,
          location,
          tradeType,
          userId,
        };
        state.trades.push(newTrade);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
      })
      .addCase(updateRemoveTrade.fulfilled, (state, action) => {
        // update trades array with updated trade
        const index = state.trades.findIndex(
          (trade) => trade.id === action.payload.id,
        );
        state.trades[index] = action.payload;
      });
  },
});

export default tradesSlice.reducer;
