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
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data;
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error:', error);

      // If the error includes a response, return the response data as part of the rejection
      if (error.response) {
        return rejectWithValue(error.response.data);
      }

      // If there's no response, reject with a generic error message
      return rejectWithValue({ message: 'An error occurred.' });
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.isCreated = false;
      state.error = null; // Add an error state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.fulfilled, (state, action) => {
        state.trades = action.payload;
        state.isCreated = true;
        state.error = null; // Clear any previous error
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.error = action.payload; // Set the error state with the payload
        state.isCreated = false; // Reservation was not created
      });
  },
});

export const reserveReducer = reservationSlice.reducer;
export const { resetCreated } = reservationSlice.actions;
export { createReservation };
