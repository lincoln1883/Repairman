import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_AUTH_URL}/signup`;

const initialState = {
  status: 'idle',
  userToken: '',
  error: null,
};

export const registerUser = createAsyncThunk(
  'register',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, user,
        { headers: { 'Content-Type': 'application/json' } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    register: (state, action) => {
      state.status = 'success';
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'success';
      state.userinfo = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { register } = registerSlice.actions;

export const registerReducer = registerSlice.reducer;
