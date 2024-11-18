// src/components/Jobs/ReviewJob.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createJob } from '../../../redux/jobs-slices/jobSlice';
import { Button, Descriptions, message } from 'antd';

const ReviewJob = () => {
  const location = useLocation();
  const jobDetails = location.state?.jobDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debug to inspect the structure of jobDetails
//   useEffect(() => {
//     console.log('jobDetails:', jobDetails);
//   }, [jobDetails]);
// console.log("cvbnm,", jobDetails?.['criteria.dateOfBirth']?.$d ? new Date(jobDetails['criteria.dateOfBirth'].$d) : null)

const handlePayment = () => {
    // Rename the jobDetails variable to jobData to avoid conflict
    const jobData = {
      title: jobDetails?.title,
      description: jobDetails?.description,
      criteria: {
        skills: jobDetails?.['criteria.skills'],
        minExperience: jobDetails?.['criteria.minExperience'],
        education: jobDetails?.['criteria.education'],
        location: jobDetails?.['criteria.location'],
        area: jobDetails?.['criteria.area'],
        College: jobDetails?.['criteria.College'],
        dateOfBirth: jobDetails?.['criteria.dateOfBirth']?.$d ? new Date(jobDetails['criteria.dateOfBirth'].$d) : null, // Convert Day.js to native Date
        academicPercentage: jobDetails?.['criteria.academicPercentage'],
      },
      // Add any additional fields, such as `postedBy` if needed
    };
  
    const options = {
      key: 'rzp_test_RGXMJ7AaFuSh0Q', // Replace with your Razorpay key
      amount: 50000, // in paise (500 INR)
      currency: 'INR',
      name: 'Job Listing Fee',
      description: 'Payment for job listing',
      handler: async (response) => {
        try {
          await dispatch(createJob(jobData)).unwrap(); // Use jobData here
          message.success('Job created successfully');
          navigate('/dashboard');
        } catch (error) {
          message.error(`Failed to create job: ${error.message}`);
        }
      },
      prefill: {
        name: "HR Name",
        email: "hr@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <h2>Review Job Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Title">{jobDetails?.title}</Descriptions.Item>
        <Descriptions.Item label="Description">{jobDetails?.description}</Descriptions.Item>
        <Descriptions.Item label="Skills">{jobDetails?.['criteria.skills']?.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Minimum Experience">{jobDetails?.['criteria.minExperience']} years</Descriptions.Item>
        <Descriptions.Item label="Education">{jobDetails?.['criteria.education']}</Descriptions.Item>
        <Descriptions.Item label="Location">{jobDetails?.['criteria.location']}</Descriptions.Item>
        <Descriptions.Item label="Area">{jobDetails?.['criteria.area']}</Descriptions.Item>
        <Descriptions.Item label="Colleges">{jobDetails?.['criteria.College']?.join(', ')}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {jobDetails?.['criteria.dateOfBirth']?.$d ? new Date(jobDetails['criteria.dateOfBirth'].$d).toLocaleDateString() : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Percentage">
          {jobDetails?.['criteria.academicPercentage']}%
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" onClick={handlePayment} style={{ marginTop: '16px' }}>
        Pay & Create Job
      </Button>
    </div>
  );
};

export default ReviewJob;
