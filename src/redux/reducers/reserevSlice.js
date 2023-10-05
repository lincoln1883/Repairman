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

const fetchCities = createAsyncThunk(
  'reservation/fetchCities',
  async () => {
    try {
      const cityEndpoint = '/api/v1/trade/';
      const cityUrl = baseUrl + cityEndpoint;
      const response = await axios.get(cityUrl, { headers });
      console.log('the response is', response);
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
      .addCase(fetchCities.fulfilled, (state, action) => {
        console.log('the action.payload is', action.payload);
        state.cities = action.payload;
      });
  },
});

export const reserveReducer = reservationSlice.reducer;
export { createReservation, fetchCities };
