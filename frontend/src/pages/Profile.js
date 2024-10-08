import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/user-slices/userSlice'; // Adjust the import path based on your structure
import { Card, Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userInfo) return <p>No profile data available.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Card title="User Profile" style={{ width: 600, margin: '0 auto' }}>
        <Title level={4}>{userInfo.name}</Title>
        <Text>Email: {userInfo.email}</Text>
        <Row gutter={16} style={{ marginTop: '16px' }}>
          <Col span={12}>
            <Text>Skills: {userInfo.profile.skills.join(', ')}</Text>
          </Col>
          <Col span={12}>
            <Text>Experience: {userInfo.profile.experience} years</Text>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '8px' }}>
          <Col span={12}>
            <Text>Education: {userInfo.profile.education}</Text>
          </Col>
          <Col span={12}>
            <Text>Location: {userInfo.profile.location}</Text>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '8px' }}>
          <Col span={12}>
            <Text>Date of Birth: {new Date(userInfo.profile.dateOfBirth).toLocaleDateString()}</Text>
          </Col>
          <Col span={12}>
            <Text>Academic Percentage: {userInfo.profile.academicPercentage}%</Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
