import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../api-link/config';
import axios from 'axios';

// Initial state
const initialState = {
    jobs: [],
    job: null,
    loadingJobs: false,
    loadingJobDetail: false,
    applyingForJob: false, // Track loading state for job application
    error: null,
    applicationError: null, // Track error for job application
};

// Async Thunks

// Fetch all jobs
export const fetchAllJobs = createAsyncThunk('jobs/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${config.API_URL}/api/v1/all-jobs`);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Fetch all jobs posted by HR
export const fetchJobsByHR = createAsyncThunk('jobs/fetchByHR', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/jobs/hr`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Fetch job by ID
export const fetchJobById = createAsyncThunk('jobs/fetchById', async (jobId, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/job/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Create a new job
export const createJob = createAsyncThunk('jobs/create', async (jobData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${config.API_URL}/api/v1/jobs`, jobData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Update a job
export const updateJob = createAsyncThunk('jobs/update', async ({ id, jobData }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${config.API_URL}/api/v1/jobs/${id}`, jobData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Delete a job
export const deleteJob = createAsyncThunk('jobs/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${config.API_URL}/api/v1/jobs/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Apply for a job
export const applyForJob = createAsyncThunk('jobs/apply', async (jobId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${config.API_URL}/api/v1/jobs/${jobId}/apply`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Job slice
const jobSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        clearJobError: (state) => {
            state.error = null;
        },
        clearApplicationError: (state) => {
            state.applicationError = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all jobs
            .addCase(fetchAllJobs.pending, (state) => {
                state.loadingJobs = true;
                state.error = null;
            })
            .addCase(fetchAllJobs.fulfilled, (state, action) => {
                state.loadingJobs = false;
                state.jobs = action.payload;
            })
            .addCase(fetchAllJobs.rejected, (state, action) => {
                state.loadingJobs = false;
                state.error = action.payload;
            })

            // Fetch jobs by HR
            .addCase(fetchJobsByHR.pending, (state) => {
                state.loadingJobs = true;
                state.error = null;
            })
            .addCase(fetchJobsByHR.fulfilled, (state, action) => {
                state.loadingJobs = false;
                state.jobs = action.payload;
            })
            .addCase(fetchJobsByHR.rejected, (state, action) => {
                state.loadingJobs = false;
                state.error = action.payload;
            })

            // Fetch job by ID
            .addCase(fetchJobById.pending, (state) => {
                state.loadingJobDetail = true;
                state.error = null;
            })
            .addCase(fetchJobById.fulfilled, (state, action) => {
                state.loadingJobDetail = false;
                state.job = action.payload;
            })
            .addCase(fetchJobById.rejected, (state, action) => {
                state.loadingJobDetail = false;
                state.error = action.payload;
            })

            // Create a job
            .addCase(createJob.pending, (state) => {
                state.loadingJobs = true;
                state.error = null;
            })
            .addCase(createJob.fulfilled, (state, action) => {
                state.loadingJobs = false;
                state.jobs.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.loadingJobs = false;
                state.error = action.payload;
            })

            // Update a job
            .addCase(updateJob.pending, (state) => {
                state.loadingJobs = true;
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loadingJobs = false;
                state.jobs = state.jobs.map((job) =>
                    job._id === action.payload._id ? action.payload : job
                );
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loadingJobs = false;
                state.error = action.payload;
            })

            // Delete a job
            .addCase(deleteJob.pending, (state) => {
                state.loadingJobs = true;
                state.error = null;
            })
            .addCase(deleteJob.fulfilled, (state, action) => {
                state.loadingJobs = false;
                state.jobs = state.jobs.filter((job) => job._id !== action.payload);
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loadingJobs = false;
                state.error = action.payload;
            })

            // Apply for a job
            .addCase(applyForJob.pending, (state) => {
                state.applyingForJob = true;
                state.error = null;
            })
            .addCase(applyForJob.fulfilled, (state, action) => {
                state.applyingForJob = false;
            })
            .addCase(applyForJob.rejected, (state, action) => {
                state.applyingForJob = false;
                state.error = action.payload;
            });
    },
});

export const { clearJobError, clearApplicationError } = jobSlice.actions;

export default jobSlice.reducer;
