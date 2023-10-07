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
  isCreated: false,
  msg: null,
};

const createReservation = createAsyncThunk(
  'reservation/createReservation',
  async (reservationData, thunkAPI) => {
    try {
      const response = await axios.post(url, reservationData, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.statusText);
    }
  },
);

const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (reservationId, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}${reservationId}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetCreated: (state) => {
      state.isCreated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.fulfilled, (state, action) => {
        state.msg = action.payload.message;
        state.isCreated = true;
      })
      .addCase(createReservation.rejected, (state, action) => {
        if (action.payload === 'Unprocessable Entity') {
          state.msg = 'You already have a reservation on this date';
        } else if (action.payload === 'Unauthorized') {
          state.msg = 'Session expired: Please Login to continue';
        }
        state.isCreated = false;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.msg = action.payload.message;
      });
  },
});

export const reserveReducer = reservationSlice.reducer;
export const { resetCreated } = reservationSlice.actions;
export { createReservation, cancelReservation };
