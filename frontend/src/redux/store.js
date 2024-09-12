// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user-slices/authSlice';

import userReducer from './user-slices/userSlice';
import jobReducer from './jobs-slices/jobSlice';
import internshipReducer from './internship-slices/internshipSlice';
import studentReducer from './student-Slice/studentSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    jobs: jobReducer,
    internships:internshipReducer,
    student: studentReducer,
    auth: authReducer,
  },
});

export default store;
