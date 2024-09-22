import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobsAndInternships } from '../../redux/student-Slice/studentSlice';
import { Card, List, Spin, Typography, Alert } from 'antd';

const { Title } = Typography;

const AppliedJobsAndInternships = () => {
    const dispatch = useDispatch();
    const { appliedJobs, appliedInternships, loading, error } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchAppliedJobsAndInternships());
    }, [dispatch]);

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div style={{ padding: '20px' }}>
            <Card title={<Title level={2}>Applied Jobs</Title>} style={{ marginBottom: '20px' }}>
                <List
                    bordered
                    dataSource={appliedJobs}
                    renderItem={job => (
                        <List.Item key={job._id}>
                            {job.title}
                        </List.Item>
                    )}
                />
            </Card>

            <Card title={<Title level={2}>Applied Internships</Title>}>
                <List
                    bordered
                    dataSource={appliedInternships}
                    renderItem={internship => (
                        <List.Item key={internship._id}>
                            {internship.title}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
};

export default AppliedJobsAndInternships;