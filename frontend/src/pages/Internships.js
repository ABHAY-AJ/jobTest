import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllInternships } from '../redux/internship-slices/internshipSlice';
import { Row, Col, Spin, Result, Typography, Input, Button, Select, Divider } from 'antd';
import InternshipCard from '../components/InternshipCard';
import { LoadingOutlined } from '@ant-design/icons';
import './Internships.css'; // Import custom CSS for styling

const { Title } = Typography;
const { Option } = Select;

const Internships = () => {
  const dispatch = useDispatch();
  const { internships, loading, error } = useSelector((state) => state.internships);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [internshipType, setInternshipType] = useState('');

  useEffect(() => {
    dispatch(fetchAllInternships());
  }, [dispatch]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleSearch = () => {
    // Implement search logic based on state (search, location, internshipType)
  };

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  // Reverse the internships array to display newly added internships first
  const reversedInternships = [...internships].reverse();

  return (
    <div className="internships-container">
      <div className="search-section">
        <Title level={2} className="internships-title">Find Your Next Internship</Title>
        <div className="search-bar">
          <Input
            placeholder="Search by internship title, company, or keyword"
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
            placeholder="Select internship type"
            value={internshipType}
            onChange={(value) => setInternshipType(value)}
            className="filter-select"
          >
            <Option value="">All Internship Types</Option>
            <Option value="Full-Time">Full-Time</Option>
            <Option value="Part-Time">Part-Time</Option>
            {/* Add more internship types as needed */}
          </Select>
        </div>
      </div>
      <Divider />
      <div className="internships-list">
        <Row gutter={[16, 16]}>
          {reversedInternships.map((internship) => (
            <Col key={internship._id} xs={24} sm={12} md={12}>
              <InternshipCard internship={internship} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Internships;
