import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Card, Button, Table, Typography, message } from 'antd';
import { fetchAllJobs, deleteJob, fetchJobsByHR } from '../../redux/jobs-slices/jobSlice';
import {  deleteInternship, fetchInternshipsByHR } from '../../redux/internship-slices/internshipSlice';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();

  // Select jobs state
  const { jobs = [], loading: jobLoading = false, error: jobError = null } = useSelector((state) => state.jobs || {});
  console.log("jjj",jobs);

  const { internships = [], loading: internshipLoading = false, error: internshipError = null } = useSelector((state) => state.internships || {});
  console.log("Internships posted by HR:", internships);

  useEffect(() => {
    dispatch(fetchJobsByHR());
    dispatch(fetchInternshipsByHR());
  }, [dispatch]);

  const handleJobDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this job?')) {
        await dispatch(deleteJob(id)).unwrap();
        message.success('Job deleted successfully');
      }
    } catch (error) {
      message.error(`Failed to delete job: ${error.message}`);
    }
  };

  const handleInternshipDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this internship?')) {
        await dispatch(deleteInternship(id)).unwrap();
        message.success('Internship deleted successfully');
      }
    } catch (error) {
      message.error(`Failed to delete internship: ${error.message}`);
    }
  };

  if (jobLoading || internshipLoading) return <p>Loading...</p>;
  if (jobError) return <p>Error loading jobs: {jobError}</p>;
  if (internshipError) return <p>Error loading internships: {internshipError}</p>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px', background: '#fff' }}>
          <Title level={2}>Dashboard</Title>
          <Row gutter={24} style={{ marginBottom: '16px' }}>
            <Col span={24}>
              <Button type="primary" style={{ marginBottom: '16px' }}>
                <Link to="/create-job" style={{ textDecoration: 'none' }}>Post New Job</Link>
              </Button>
              <Button type="primary" style={{ marginBottom: '16px', marginLeft: '16px' }}>
                <Link to="/create-internship" style={{ textDecoration: 'none' }}>Post New Internship</Link>
              </Button>
            </Col>
          </Row>

          {/* Jobs Management Section */}
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Jobs Management" className="mb-3">
                <Table dataSource={jobs} rowKey="_id">
                  <Table.Column title="Title" dataIndex="title" key="title" />
                  <Table.Column title="Description" dataIndex="description" key="description" />
                  <Table.Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                      <span>
                        <Button type="link">
                          <Link to={`/jobs/${record._id}`}>View</Link>
                        </Button>
                        <Button type="link">
                          <Link to={`/edit-job/${record._id}`}>Edit</Link>
                        </Button>
                        <Button
                          type="link"
                          danger
                          onClick={() => handleJobDelete(record._id)}
                        >
                          Delete
                        </Button>
                      </span>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>

          {/* Internships Management Section */}
          <Row gutter={16}>
            <Col span={24}>
              <Card title="Internships Management" className="mb-3">
                <Table dataSource={internships} rowKey="_id">
                  <Table.Column title="Title" dataIndex="title" key="title" />
                  <Table.Column title="Description" dataIndex="description" key="description" />
                  <Table.Column
                    title="Actions"
                    key="actions"
                    render={(text, record) => (
                      <span>
                        <Button type="link">
                          <Link to={`/internships/${record._id}`}>View</Link>
                        </Button>
                        <Button type="link">
                          <Link to={`/edit-internship/${record._id}`}>Edit</Link>
                        </Button>
                        <Button
                          type="link"
                          danger
                          onClick={() => handleInternshipDelete(record._id)}
                        >
                          Delete
                        </Button>
                      </span>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
