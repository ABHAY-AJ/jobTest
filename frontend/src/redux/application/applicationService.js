import axios from 'axios';
import config from '../api-link/config';

// Fetch all applications for a specific job
export const fetchApplicationsForJob = async (jobId) => {
    const response = await axios.get(`${config.API_URL}/api/v1/hr/all-application/${jobId}`);
    return response.data;
};

// Filter applications based on score and other filters
export const filterApplicationsForJob = async (jobId, filters) => {
    const response = await axios.get(`${config.API_URL}/api/applications/job/${jobId}/filter`, {
        params: filters,
    });
    return response.data;
};

// Review an application (e.g., update status)
export const reviewApplication = async (applicationId, updatedStatus) => {
    const response = await axios.put(`${config.API_URL}/api/v1/hr/applications/${applicationId}/review`, updatedStatus);
    return response.data;
};
