import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../api-link/config';

// Define initial state
const initialState = {
    internships: [],
    internship: null,  // For storing single internship data
    loading: false,
    error: null,
};

// Fetch all TPO Internships
export const fetchAllTpoInternships = createAsyncThunk(
    'tpoInternships/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${config.API_URL}/api/v1/all-tpo-internships`);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);



// Fetch all internships posted by HR
export const fetchInternshipsByTPO = createAsyncThunk('tpoInternships/fetchByTPO', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/tpo-internships/hr`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});



// Fetch a specific TPO Internship by ID
export const fetchTpoInternshipById = createAsyncThunk(
    'tpoInternships/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${config.API_URL}/api/v1/tpo-internship/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Create a new TPO Internship
export const createTpoInternship = createAsyncThunk(
    'tpoInternships/create',
    async (internship, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${config.API_URL}/api/v1/tpo-internships`, internship, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Update a TPO Internship
export const updateTpoInternship = createAsyncThunk(
    'tpoInternships/update',
    async ({ internshipId, updates }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${config.API_URL}/api/v1/tpo-internships/${internshipId}`, updates, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Delete a TPO Internship
export const deleteTpoInternship = createAsyncThunk(
    'tpoInternships/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${config.API_URL}/api/v1/tpo-internships/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Apply for a TPO Internship
export const applyForTpoInternship = createAsyncThunk(
    'tpoInternships/apply',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${config.API_URL}/api/v1/tpo-internships/${id}/apply`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


// Slice for TPO internships
const tpoInternshipSlice = createSlice({
    name: 'tpoInternships',
    initialState,
    reducers: {
        clearTpoInternshipError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all TPO internships
            .addCase(fetchAllTpoInternships.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTpoInternships.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = action.payload;
            })
            .addCase(fetchAllTpoInternships.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Fetch internships by HR
            .addCase(fetchInternshipsByTPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInternshipsByTPO.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = action.payload;
            })
            .addCase(fetchInternshipsByTPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch internship by ID
            .addCase(fetchTpoInternshipById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTpoInternshipById.fulfilled, (state, action) => {
                state.loading = false;
                state.internship = action.payload;
            })
            .addCase(fetchTpoInternshipById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create internship
            .addCase(createTpoInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTpoInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.internships.push(action.payload);
            })
            .addCase(createTpoInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update internship
            .addCase(updateTpoInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTpoInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = state.internships.map(internship =>
                    internship._id === action.payload._id ? action.payload : internship
                );
            })
            .addCase(updateTpoInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete internship
            .addCase(deleteTpoInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTpoInternship.fulfilled, (state, action) => {
                state.loading = false;
                state.internships = state.internships.filter(internship => internship._id !== action.payload);
            })
            .addCase(deleteTpoInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Apply for internship
            .addCase(applyForTpoInternship.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyForTpoInternship.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(applyForTpoInternship.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearTpoInternshipError } = tpoInternshipSlice.actions;

export default tpoInternshipSlice.reducer;
