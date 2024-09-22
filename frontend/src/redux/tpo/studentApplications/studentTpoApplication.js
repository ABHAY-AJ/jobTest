import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../api-link/config';

// Fetch all TPO applications
export const fetchTpoApplications = createAsyncThunk(
    'tpoApplications/fetchTpoApplications',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_URL}/api/v1/tpo/all-tpo-application/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("res",response.data.data)
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);


// Filter TPO applications by score
export const filterTpoApplications = createAsyncThunk(
    'tpoApplications/filterTpoApplications',
    async ({ tpoEventId, minScore }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.API_URL}/api/v1/tpo/tpo-applications/${tpoEventId}/filter`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { minScore }, // Sending minScore as a query parameter
            });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Review a TPO application (accept/reject)
export const reviewTpoApplication = createAsyncThunk(
    'tpoApplications/reviewTpoApplication',
    async ({ applicationId, reviewData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${config.API_URL}/api/v1/tpo/tpo-applications/${applicationId}/review`,
                reviewData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const tpoApplicationSlice = createSlice({
    name: 'tpoApplications',
    initialState: {
        tpplications: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Handle fetchTpoApplications
        builder.addCase(fetchTpoApplications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTpoApplications.fulfilled, (state, action) => {
            console.log("Action",action.payload)
            state.loading = false;
            
            state.tpplications = action.payload || [];
        });
        builder.addCase(fetchTpoApplications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle filterTpoApplications
        builder.addCase(filterTpoApplications.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(filterTpoApplications.fulfilled, (state, action) => {
            state.loading = false;
            state.tpplications = action.payload || [];
        });
        builder.addCase(filterTpoApplications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Handle reviewTpoApplication
        builder.addCase(reviewTpoApplication.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(reviewTpoApplication.fulfilled, (state, action) => {
            state.loading = false;
            const updatedApplication = action.payload;
            state.tpplications = state.tpplications.map(app =>
                app._id === updatedApplication._id ? updatedApplication : app
            );
        });
        builder.addCase(reviewTpoApplication.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default tpoApplicationSlice.reducer;
