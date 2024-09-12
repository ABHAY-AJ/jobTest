import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  userInfo: null,  // Holds user data
  token: localStorage.getItem('token') || null, // Token from localStorage if available
  role: null,
  loading: false,
  error: null,
};

// Async actions
export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/auth/register', userData);
    localStorage.setItem('token', data.data.token);  // Store token in localStorage
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', userData);
    localStorage.setItem('token', data.data.token);
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const getProfile = createAsyncThunk('user/profile', async (_, { getState, rejectWithValue }) => {
  try {
    const { user } = getState();
    const { data } = await axios.get('http://localhost:5000/api/auth/get-user', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.role = action.payload.role;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
