import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_AUTH_URL;
const endpoint = '/api/v1/reservations/';
const url = baseUrl + endpoint;
const token = JSON.parse(localStorage.getItem('token'));

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

const initialState = {
  cities: null,
  isCreated: false,
};

const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservationData) => {
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.isCreated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createReservation.fulfilled, (state, action) => {
      console.log('the trades are', action.payload);
      state.trades = action.payload;
      state.isCreated = true;
    });
  },
});

export const reserveReducer = reservationSlice.reducer;
export const { resetCreated } = reservationSlice.actions;
export { createReservation };
