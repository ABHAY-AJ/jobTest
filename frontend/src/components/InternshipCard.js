// src/components/InternshipCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const InternshipCard = ({ internship }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{internship.title}</Card.Title>
        <Card.Text>{internship.description}</Card.Text>
        <Button as={Link} to={`/internships/${internship._id}`} variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default InternshipCard;
