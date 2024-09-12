import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../redux/jobs-slices/jobSlice';
import { fetchAppliedJobs } from '../redux/student-Slice/studentSlice'; // Assuming student slice handles applied jobs
import { Row, Col, Spin, Result, Typography } from 'antd';
import JobCard from '../components/JobCard';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Jobs = () => {
    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state) => state.jobs);
    const { appliedJobs } = useSelector((state) => state.student);

    useEffect(() => {
        dispatch(fetchAllJobs());
        dispatch(fetchAppliedJobs());
    }, [dispatch]);

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    if (loading) return <Spin indicator={antIcon} />;
    if (error) return <Result status="error" title="Error" subTitle={error} />;

    // Filter out jobs that the student has applied for
    const filteredJobs = jobs.filter(job => job && !appliedJobs.includes(job._id));

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Available Jobs</Title>
            <Row gutter={[16, 16]}>
                {filteredJobs.length ? (
                    filteredJobs.map((job) => (
                        <Col key={job._id} xs={24} sm={12} lg={8}>
                            <JobCard job={job} />
                        </Col>
                    ))
                ) : (
                    <Col span={24}><Result status="info" title="No jobs available" /></Col>
                )}
            </Row>
        </div>
    );
};

export default Jobs;
