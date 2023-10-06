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
  cities: [],
  createReservationStatus: 'idle',
};

export const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchCities = createAsyncThunk(
  'reservation/fetchCities',
  async (_, { rejectWithValue }) => {
    try {
      const cityEndpoint = '/api/v1/trade/';
      const cityUrl = baseUrl + cityEndpoint;
      const response = await axios.get(cityUrl, { headers });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const reserveSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.createReservationStatus = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.createReservationStatus = 'succeeded';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.createReservationStatus = 'failed';
      })
      .addCase(createReservation.pending, (state) => {
        state.createReservationStatus = 'loading';
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.createReservationStatus = 'succeeded';
      })
      .addCase(createReservation.rejected, (state) => {
        state.createReservationStatus = 'failed';
      });
  },
});

export default reserveSlice.reducer;
