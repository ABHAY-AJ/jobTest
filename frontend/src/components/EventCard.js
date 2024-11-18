import React from 'react';
import { Typography, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './JobCard.css'; // Import custom CSS for styling

const { Title, Text } = Typography;

const TpoEventCard = ({ event }) => {
  return (
    <div className="job-list-item">
      <div className="job-info">
        <Title level={4} className="job-title">{event.title}</Title>
        <Text className="job-company">{event.company}</Text>
        <Divider />
        <Text className="job-description">{event.description}</Text>
      </div>
      <div className="job-actions">
        <Link to={`/tpo-events/${event._id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default TpoEventCard;
