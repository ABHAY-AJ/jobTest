import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentProfile } from '../../../redux/student-profile/student-profile'; // Adjust import path as necessary
import { Layout, Typography, Spin, Alert, Card, Tag, Divider, Row, Col, Avatar, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const StudentProfile = () => {
    const { studentId } = useParams();
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.studentp);

    useEffect(() => {
        dispatch(fetchStudentProfile(studentId));
    }, [dispatch, studentId]);

    if (loading) return <Spin size="large" />;
    if (error) return <Alert message="Error" description={error} type="error" />;

    if (!profile) return <p>No profile data available</p>;

    return (
        <Layout style={{ padding: '24px', minHeight: '100vh' }}>
            <Content style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Card
                    bordered={false}
                    style={{
                        marginBottom: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Row gutter={16}>
                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Avatar
                                size={120}
                                icon={<UserOutlined />}
                                src={profile.profilePicture || undefined}
                                style={{ marginBottom: '10px', border: '2px solid #1890ff' }}
                            />
                            <Title level={2}>{profile.name}</Title>
                        </Col>
                    </Row>
                </Card>

                <Card
                    bordered={false}
                    style={{
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Descriptions
                        title="Profile Details"
                        bordered
                        column={2}
                        style={{ marginBottom: '20px' }}
                    >
                        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
                        <Descriptions.Item label="Location">{profile.profile?.location || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Education">{profile.profile?.education || 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Experience">{profile.profile?.experience || 'N/A'} years</Descriptions.Item>
                    </Descriptions>

                    <Divider />

                    <div>
                        <Title level={4}>Skills:</Title>
                        <div style={{ marginTop: '10px' }}>
                            {profile.profile?.skills?.length ? (
                                profile.profile.skills.map((skill, index) => (
                                    <Tag color="blue" key={index} style={{ margin: '5px' }}>{skill}</Tag>
                                ))
                            ) : (
                                <p>No skills available</p>
                            )}
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default StudentProfile;
