// src/redux/student-slices/studentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from "../api-link/config"; // Adjust import according to your setup

// Thunk to fetch student profile
export const fetchStudentProfile = createAsyncThunk(
    'studentp/fetchProfile',
    async (studentId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}/api/v1/students/${studentId}/profile`);
           
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error fetching student profile');
        }
    }
);

// Slice
const student_profileSlice = createSlice({
    name: 'studentp',
    initialState: {
        profile: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchStudentProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default student_profileSlice.reducer;
