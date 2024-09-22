import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApplicationsForJob, filterApplicationsForJob, reviewApplication } from '../application/applicationService';

// Initial state
const initialState = {
    applications: [],
    loading: false,
    error: null,
    applicationError: null, // Track error for application operations
};

// Async Thunks

// Fetch all applications for a job
export const fetchApplications = createAsyncThunk(
    'applications/fetch',
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await fetchApplicationsForJob(jobId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Filter applications
export const filterApplications = createAsyncThunk(
    'applications/filter',
    async ({ jobId, filters }, { rejectWithValue }) => {
        try {
            const response = await filterApplicationsForJob(jobId, filters);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Review an application
export const reviewApplicationThunk = createAsyncThunk(
    'applications/review',
    async ({ applicationId, updatedStatus }, { rejectWithValue }) => {
        try {
            const response = await reviewApplication(applicationId, updatedStatus);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Application slice
const applicationSlice = createSlice({
    name: 'applications',
    initialState,
    reducers: {
        clearApplicationError: (state) => {
            state.applicationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch applications
            .addCase(fetchApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(fetchApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Filter applications
            .addCase(filterApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(filterApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Review an application
            .addCase(reviewApplicationThunk.pending, (state) => {
                state.loading = true;
                state.applicationError = null;
            })
            .addCase(reviewApplicationThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = state.applications.map((app) =>
                    app._id === action.payload._id ? action.payload : app
                );
            })
            .addCase(reviewApplicationThunk.rejected, (state, action) => {
                state.loading = false;
                state.applicationError = action.payload;
            });
    },
});

export const { clearApplicationError } = applicationSlice.actions;

export default applicationSlice.reducer;
