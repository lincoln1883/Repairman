// usersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'admin',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export default usersSlice.reducer;
