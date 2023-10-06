// Redux Slice (reservationSlice.js)
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
  reservations: [], // Updated state property name
};

const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
);

// Create a new action to cancel a reservation
const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (reservationId) => {
    try {
      const response = await axios.delete(`${url}${reservationId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.reservations = action.payload;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        // Update the store by removing the canceled reservation
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload.id,
        );
      });
  },
});

export const reservationReducer = reservationsSlice.reducer;
export { fetchReservations, cancelReservation };
