import React from 'react';
import { Typography, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import './InternshipCard.css'; // Custom CSS for styling

const { Title, Text } = Typography;

const InternshipCard = ({ internship }) => {
  return (
    <div className="internship-list-item">
      <div className="internship-info">
        <Title level={4} className="internship-title">{internship.title}</Title>
        <Text className="internship-company">{internship.company}</Text>
        <Divider />
        <Text className="internship-description">{internship.description}</Text>
      </div>
      <div className="internship-actions">
        <Link to={`/internships/${internship._id}`}>
          <Button type="primary">View Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default InternshipCard;
