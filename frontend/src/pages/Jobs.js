import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../redux/jobs-slices/jobSlice';
import { Row, Col, Spin, Result, Typography } from 'antd';
import JobCard from '../components/JobCard';
import { LoadingOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  console.log(jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Available Jobs</Title>
      <Row gutter={[16, 16]}>
        {jobs.map((job) => (
          <Col key={job._id} xs={24} sm={12} lg={8}>
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Jobs;
