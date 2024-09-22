import React from 'react';
import { Typography, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './JobCard.css'; // Import custom CSS for styling

const { Title, Text } = Typography;

const JobCard = ({ job }) => {
  return (
    <div className="job-list-item">
      <div className="job-info">
        <Title level={4} className="job-title">{job.title}</Title>
        <Text className="job-company">{job.company}</Text>
        <Divider />
        <Text className="job-description">{job.description}</Text>
      </div>
      <div className="job-actions">
        <Link to={`/jobs/${job._id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
