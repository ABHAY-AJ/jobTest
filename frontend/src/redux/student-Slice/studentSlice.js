import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../api-link/config';

// Fetch applied jobs and internships
export const fetchAppliedJobsAndInternships = createAsyncThunk(
    'student/fetchAppliedJobsAndInternships',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_URL}/api/v1/applied`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch student applications
export const fetchStudentApplications = createAsyncThunk(
    'student/fetchStudentApplications',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_URL}/api/v1/applied-application`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch applied jobs
export const fetchAppliedJobs = createAsyncThunk('student/fetchAppliedJobs', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/applied-jobs`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        appliedJobs: [],
        appliedInternships: [],
        applications: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchAppliedJobsAndInternships
        builder.addCase(fetchAppliedJobsAndInternships.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAppliedJobsAndInternships.fulfilled, (state, action) => {
            state.loading = false;
            state.appliedJobs = action.payload.appliedJobs;
            state.appliedInternships = action.payload.appliedInternships;
        });
        builder.addCase(fetchAppliedJobsAndInternships.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle fetchStudentApplications
        builder.addCase(fetchStudentApplications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchStudentApplications.fulfilled, (state, action) => {
            state.loading = false;
            state.applications = action.payload.applications;
        });
        builder.addCase(fetchStudentApplications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(fetchAppliedJobs.fulfilled, (state, action) => {
                state.appliedJobs = action.payload;
            });
    }
});

export default studentSlice.reducer;
