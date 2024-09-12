import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import config from '../api-link/config';
import axios from 'axios';

// Initial state
const initialState = {
  internships: [],
  internship: null,
    loading: false,
    error: null,
};

// Async Thunks

// Fetch all jobs
export const fetchAllInternships = createAsyncThunk('internships/fetchAll', async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${config.API_URL}/api/v1/all-internships`);
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Fetch all internships posted by HR
export const fetchInternshipsByHR = createAsyncThunk('internships/fetchByHR', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/internships/hr`, {
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
export const fetchInternshipById = createAsyncThunk('internships/fetchById', async (internshipId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${config.API_URL}/api/v1/internship/${internshipId}`, {
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
export const createInternship = createAsyncThunk('internships/create', async (internshipData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${config.API_URL}/api/v1/internships`, internshipData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Update a job
export const updateInternship = createAsyncThunk('internships/update', async ({ id, internshipData }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${config.API_URL}/api/v1/internships/${id}`, internshipData, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Delete a job
export const deleteInternship = createAsyncThunk('internships/delete', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${config.API_URL}/api/v1/internships/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Apply for a job
export const applyForInternship = createAsyncThunk('internship/apply', async (internshipId, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${config.API_URL}/api/v1/internship/${internshipId}/apply`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Job slice
const internshipSlice = createSlice({
    name: 'internships',
    initialState,
    reducers: {
        clearJobError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all jobs
            .addCase(fetchAllInternships.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllInternships.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = action.payload;
            })
            .addCase(fetchAllInternships.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch internships by HR
            .addCase(fetchInternshipsByHR.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInternshipsByHR.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = action.payload;
            })
            .addCase(fetchInternshipsByHR.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch job by ID
            .addCase(fetchInternshipById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInternshipById.fulfilled, (state, action) => {
                state.loading = false;
                state.internship = action.payload;
            })
            .addCase(fetchInternshipById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create a job
            .addCase(createInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs.push(action.payload);
            })
            .addCase(createInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update a job
            .addCase(updateInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = state.internships.map(internship =>
                  internship._id === action.payload._internship ? action.payload : internship
                );
            })
            .addCase(updateInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete a job
            .addCase(deleteInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = state.internships.filter(internship => internship._id !== action.payload);
            })
            .addCase(deleteInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Apply for a job
            .addCase(applyForInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyForInternship.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(applyForInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearInternshipError } = internshipSlice.actions;

export default internshipSlice.reducer;
