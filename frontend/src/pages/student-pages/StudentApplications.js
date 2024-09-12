import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentApplications } from '../../redux/student-Slice/studentSlice';
import { Card, List, Spin, Typography, Alert, Tag, Descriptions, Divider } from 'antd';

const { Title } = Typography;

const statusColors = {
    Pending: 'orange',
    Reviewed: 'blue',
    Accepted: 'green',
    Rejected: 'red'
};

const StudentApplications = () => {
    const dispatch = useDispatch();
    const { applications, loading, error } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchStudentApplications());
    }, [dispatch]);

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Student Applications</Title>
            <Divider />
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={applications}
                renderItem={(application) => (
                    <List.Item key={application._id}>
                        <Card title={`Application ID: ${application._id}`}>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Application Status">
                                    <Tag color={statusColors[application.status]}>
                                        {application.status}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Score">
                                    {application.score}
                                </Descriptions.Item>
                                {application.job && (
                                    <>
                                        <Descriptions.Item label="Applied Job ID">
                                            {application.job}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Job Details">
                                            {/* You can add more job-related details here, e.g., title, company */}
                                        </Descriptions.Item>
                                    </>
                                )}
                                {application.internship && (
                                    <>
                                        <Descriptions.Item label="Applied Internship ID">
                                            {application.internship}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Internship Details">
                                            {/* Add more internship-related details here */}
                                        </Descriptions.Item>
                                    </>
                                )}
                                <Descriptions.Item label="Date of Application">
                                    {new Date(application.date).toLocaleDateString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default StudentApplications;
