// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.role=null;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    },
    register(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
