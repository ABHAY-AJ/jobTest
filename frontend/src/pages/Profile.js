// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/api';
import { Container, Card } from 'react-bootstrap';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetchUserProfile();
      setProfile(response.data);
    };
    getProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <Container>
      <Card className="my-4">
        <Card.Body>
          <Card.Title>{profile.name}</Card.Title>
          <Card.Text>Email: {profile.email}</Card.Text>
          <Card.Text>Skills: {profile.skills.join(', ')}</Card.Text>
          <Card.Text>Experience: {profile.experience} years</Card.Text>
          <Card.Text>Education: {profile.education}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
