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
  loading: false,
  error: null,
  reservation: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.reservation = action.payload;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const reserveReducer = reservationSlice.reducer;
export { createReservation };
