import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_AUTH_URL;
const endpoint = '/api/v1/reservations/';
const url = baseUrl + endpoint;

const initialState = {
  reservations: [],
  msg: null,
};

const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.statusText);
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
      .addCase(fetchReservations.rejected, (state, action) => {
        if (action.error.message === 'Unauthorized') {
          state.msg = 'Please refresh the page to continue';
        } else {
          state.msg = action.error.message;
        }
      });
  },
});

export const reservationReducer = reservationsSlice.reducer;
export { fetchReservations };
