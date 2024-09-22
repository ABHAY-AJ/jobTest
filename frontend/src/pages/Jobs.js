import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJobs } from '../redux/jobs-slices/jobSlice';
import { Row, Col, Spin, Result, Typography, Input, Button, Select, Divider } from 'antd';
import JobCard from '../components/JobCard';
import { LoadingOutlined } from '@ant-design/icons';
import './Jobs.css'; // Import custom CSS file for styling

const { Title } = Typography;
const { Option } = Select;

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleSearch = () => {
    // Implement search logic based on state (search, location, jobType)
  };

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  // Reverse the jobs array to display newly added jobs first
  const reversedJobs = [...jobs].reverse();

  return (
    <div className="jobs-container">
      <div className="search-section">
        <Title level={2} className="jobs-title">Find Your Next Job</Title>
        <div className="search-bar">
          <Input
            placeholder="Search by job title, company, or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <Button type="primary" onClick={handleSearch}>Search</Button>
        </div>
        <div className="filters">
          <Select
            placeholder="Select location"
            value={location}
            onChange={(value) => setLocation(value)}
            className="filter-select"
          >
            <Option value="">All Locations</Option>
            <Option value="Remote">Remote</Option>
            <Option value="Delhi">Delhi</Option>
            <Option value="Bangalore">Bangalore</Option>
            {/* Add more locations as needed */}
          </Select>
          <Select
            placeholder="Select job type"
            value={jobType}
            onChange={(value) => setJobType(value)}
            className="filter-select"
          >
            <Option value="">All Job Types</Option>
            <Option value="Full-Time">Full-Time</Option>
            <Option value="Part-Time">Part-Time</Option>
            <Option value="Internship">Internship</Option>
            {/* Add more job types as needed */}
          </Select>
        </div>
      </div>
      <Divider />
      <div className="jobs-list">
        <Row gutter={[16, 16]}>
          {reversedJobs.map((job) => (
            <Col key={job._id} xs={24} sm={24} md={12} lg={12}>
              <JobCard job={job} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Jobs;
