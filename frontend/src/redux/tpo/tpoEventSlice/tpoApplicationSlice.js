import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../api-link/config'; // Adjust import according to your setup

// Thunk to apply for a TPO event
export const applyForTpoEvent = createAsyncThunk(
    'tpoApplications/apply',
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${config.API_URL}/api/v1/tpo-events/${eventId}/apply`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Error applying for TPO event');
        }
    }
);

// Slice for TPO applications
const tpoApplicationSlice = createSlice({
    name: 'tpoApplications',
    initialState: {
        application: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyForTpoEvent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applyForTpoEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.application = action.payload;
            })
            .addCase(applyForTpoEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tpoApplicationSlice.reducer;
