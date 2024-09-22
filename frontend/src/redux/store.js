// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user-slices/authSlice';

import userReducer from './user-slices/userSlice';
import jobReducer from './jobs-slices/jobSlice';
import internshipReducer from './internship-slices/internshipSlice';
import studentReducer from './student-Slice/studentSlice';
import applicationReducer from './application/applicationSlice';
import studentProfile from './student-profile/student-profile';
import tpoEventReducer from "./tpo/tpoEventSlice/tpoEventSlice";
import tpoApplicationReducer from './tpo/studentApplications/studentTpoApplication';
import tpoJobsReducer from "./tpo/tpoJobs/tpoJobsSlice"
import tpoInternshipsReducer from "./tpo/tpoInternship/tpoInternshipSlice"
import tpoEventsReducer from './tpo/tpoEventSlice/tpoEventSlice';



const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
    internships:internshipReducer,
    applications: applicationReducer,
    student: studentReducer,
    studentp: studentProfile,
    auth: authReducer,
    tpoEvents: tpoEventReducer,
    tpplications: tpoApplicationReducer,
    tpoJobs: tpoJobsReducer,
    tpoInternships: tpoInternshipsReducer,
    tpoEvents: tpoEventsReducer
  },
});

export default store;
