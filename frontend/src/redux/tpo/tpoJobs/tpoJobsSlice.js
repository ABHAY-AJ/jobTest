import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../api-link/config';

// Initial state
const initialState = {
  jobs: [],
  job: null,
  loadingJobs: false,
  loadingJobDetail: false,
  creatingJob: false,
  deletingJob: false,
  error: null,
};

// Async Thunks

// Fetch all TPO jobs
export const fetchTpoJobs = createAsyncThunk('tpoJobs/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${config.API_URL}/api/v1/all-tpo-jobs`);
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


// Fetch all jobs posted by HR
export const fetchJobsByTPO = createAsyncThunk('jobs/fetchByTPO', async (_, { rejectWithValue }) => {
  try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${config.API_URL}/api/v1/tpo-jobs/hr`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return data.data;
  } catch (error) {
      return rejectWithValue(error.response.data.message);
  }
});

// Fetch TPO job by ID
export const fetchTpoJobById = createAsyncThunk('tpoJobs/fetchById', async (jobId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`${config.API_URL}/api/v1/tpo-job/${jobId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create new TPO job
export const createTpoJob = createAsyncThunk('tpoJobs/create', async (jobData, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`${config.API_URL}/api/v1/tpo-jobs`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Update TPO job
export const updateTpoJob = createAsyncThunk('tpoJobs/update', async ({ jobId, jobData }, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`${config.API_URL}/api/v1/tpo-jobs/${jobId}`, jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


// Delete TPO job
export const deleteTpoJob = createAsyncThunk('tpoJobs/delete', async (jobId, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${config.API_URL}/api/v1/tpo-jobs/${jobId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return jobId;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Apply for TPO job
export const applyForTpoJob = createAsyncThunk('tpoJobs/apply', async (jobId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.post(`${config.API_URL}/api/v1/tpo-jobs/${jobId}/apply`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res",data.data)
    return data.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


// TPO Jobs slice
const tpoJobsSlice = createSlice({
  name: 'tpoJobs',
  initialState,
  reducers: {
    clearTpoJobError: (state) => {
      state.error = null;
    },
    clearJobDetail: (state) => {
      state.job = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all TPO jobs
      .addCase(fetchTpoJobs.pending, (state) => {
        state.loadingJobs = true;
        state.error = null;
      })
      .addCase(fetchTpoJobs.fulfilled, (state, action) => {
        state.loadingJobs = false;
        state.jobs = action.payload;
      })
      .addCase(fetchTpoJobs.rejected, (state, action) => {
        state.loadingJobs = false;
        state.error = action.payload;
      })

      // Fetch jobs by HR
      .addCase(fetchJobsByTPO.pending, (state) => {
        state.loadingJobs = true;
        state.error = null;
    })
    .addCase(fetchJobsByTPO.fulfilled, (state, action) => {
        state.loadingJobs = false;
        state.jobs = action.payload;
    })
    .addCase(fetchJobsByTPO.rejected, (state, action) => {
        state.loadingJobs = false;
        state.error = action.payload;
    })

      // Fetch TPO job by ID
      .addCase(fetchTpoJobById.pending, (state) => {
        state.loadingJobDetail = true;
        state.error = null;
      })
      .addCase(fetchTpoJobById.fulfilled, (state, action) => {
        state.loadingJobDetail = false;
        state.job = action.payload;
      })
      .addCase(fetchTpoJobById.rejected, (state, action) => {
        state.loadingJobDetail = false;
        state.error = action.payload;
      })

      // Create new TPO job
      .addCase(createTpoJob.pending, (state) => {
        state.creatingJob = true;
        state.error = null;
      })
      .addCase(createTpoJob.fulfilled, (state, action) => {
        state.creatingJob = false;
        state.jobs.push(action.payload);
      })
      .addCase(createTpoJob.rejected, (state, action) => {
        state.creatingJob = false;
        state.error = action.payload;
      })



      // Handle job update
      .addCase(updateTpoJob.pending, (state) => {
        state.loadingJobDetail = true;
        state.error = null;
      })
      .addCase(updateTpoJob.fulfilled, (state, action) => {
        state.loadingJobDetail = false;
        const updatedJobIndex = state.jobs.findIndex((job) => job._id === action.payload._id);
        if (updatedJobIndex !== -1) {
          state.jobs[updatedJobIndex] = action.payload;
        }
      })
      .addCase(updateTpoJob.rejected, (state, action) => {
        state.loadingJobDetail = false;
        state.error = action.payload;
      })


      // Delete TPO job
      .addCase(deleteTpoJob.pending, (state) => {
        state.deletingJob = true;
        state.error = null;
      })
      .addCase(deleteTpoJob.fulfilled, (state, action) => {
        state.deletingJob = false;
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
      })
      .addCase(deleteTpoJob.rejected, (state, action) => {
        state.deletingJob = false;
        state.error = action.payload;
      })

      // Handle job application
      .addCase(applyForTpoJob.pending, (state) => {
        state.applyingForJob = true;
        state.error = null;
      })
      .addCase(applyForTpoJob.fulfilled, (state, action) => {
        state.applyingForJob = false;
        // Update state as needed, perhaps adding the application details or marking the job as applied
      })
      .addCase(applyForTpoJob.rejected, (state, action) => {
        state.applyingForJob = false;
        state.error = action.payload;
      });
  },
})




export const { clearTpoJobError, clearJobDetail } = tpoJobsSlice.actions;

export default tpoJobsSlice.reducer;
