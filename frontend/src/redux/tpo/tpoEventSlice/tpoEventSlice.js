import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../api-link/config'; // Adjust import according to your setup

// Thunk to fetch all TPO events
export const fetchAllTpoEvents = createAsyncThunk(
    'tpoEvents/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}/api/v1/all-tpo-events`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error fetching TPO events');
        }
    }
);


// Fetch all internships posted by HR
export const fetchEventsByTPO = createAsyncThunk('event/fetchByTPO', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(`${config.API_URL}/api/v1/tpo-events/hr`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// Thunk to fetch a single TPO event by ID
export const fetchTpoEventById = createAsyncThunk(
    'tpoEvents/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${config.API_URL}/api/v1/tpo-event/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error fetching TPO event');
        }
    }
);

// Thunk to create a new TPO event
export const createTpoEvent = createAsyncThunk(
    'tpoEvents/create',
    async (eventData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${config.API_URL}/api/v1/tpo-events`, eventData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error creating TPO event');
        }
    }
);

// Thunk to update a TPO event
export const updateTpoEvent = createAsyncThunk(
    'tpoEvents/update',
    async ({ id, eventData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${config.API_URL}/api/v1/tpo-events/${id}`, eventData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error updating TPO event');
        }
    }
);

// Thunk to delete a TPO event
export const deleteTpoEvent = createAsyncThunk(
    'tpoEvents/delete',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${config.API_URL}/api/v1/tpo-events/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error deleting TPO event');
        }
    }
);

// Slice for TPO events
const tpoEventSlice = createSlice({
    name: 'tpoEvents',
    initialState: {
        events: [],
        event: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTpoEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTpoEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchAllTpoEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


             // Fetch internships by HR
             .addCase(fetchEventsByTPO.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEventsByTPO.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEventsByTPO.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchTpoEventById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTpoEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.event = action.payload;
            })
            .addCase(fetchTpoEventById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createTpoEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTpoEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events.push(action.payload);
            })
            .addCase(createTpoEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateTpoEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTpoEvent.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.events.findIndex(event => event._id === action.payload._id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(updateTpoEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteTpoEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTpoEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.events = state.events.filter(event => event._id !== action.payload);
            })
            .addCase(deleteTpoEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tpoEventSlice.reducer;
