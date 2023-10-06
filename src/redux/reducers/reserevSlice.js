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
  trades: null,
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

const fetchCitiesAndTrades = createAsyncThunk(
  'reservation/fetchCitiesAndTrades',
  async () => {
    try {
      const cityEndpoint = '/api/v1/trades/';
      const cityUrl = baseUrl + cityEndpoint;
      const response = await axios.get(cityUrl, { headers });
      console.log('I am in fetch cities and the response is', response.location);
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
      .addCase(fetchCitiesAndTrades.fulfilled, (state, action) => {
        console.log('the trades are', action.payload);
        state.trades = action.payload;
        state.cities = action.payload.map((trade) => trade.location);
        console.log('cities are', state.cities);
      });
  },
});

export const reserveReducer = reservationSlice.reducer;
export { createReservation, fetchCitiesAndTrades };
