import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_AUTH_URL}/logout`;

const initialState = {
  status: 'idle',
  token: null,
};

export const logoutUser = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      return thunkAPI.rejectWithValue('Token missing');
    }
    const response = await axios.delete(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.token = action.payload;
    });
    builder.addCase(logoutUser.rejected, (state, payload) => {
      state.status = 'failed';
      state.error = payload;
    });
  },
});

export const { logout } = logoutSlice.actions;
export const logoutReducer = logoutSlice.reducer;
