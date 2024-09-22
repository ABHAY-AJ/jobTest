import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Card, Button, Table, Typography, message, Form } from 'antd';
import { fetchAllJobs, deleteJob, fetchJobsByHR } from '../../redux/jobs-slices/jobSlice';
import { deleteInternship, fetchInternshipsByHR } from '../../redux/internship-slices/internshipSlice';
import { fetchApplications, reviewApplicationThunk } from '../../redux/application/applicationSlice';
import { Link } from 'react-router-dom';
import ApplicationsModal from "./ApplicationsModal/ApplicationsModal";
import "./hh.css"

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [reviewForm] = Form.useForm();

  const hrr  =  useSelector((state) => state);
  console.log("hrr",hrr);

  const { jobs = [], loading: jobLoading = false, error: jobError = null } = useSelector((state) => state.jobs || {});
  const { internships = [], loading: internshipLoading = false, error: internshipError = null } = useSelector((state) => state.internships || {});

  useEffect(() => {
    dispatch(fetchJobsByHR());
    dispatch(fetchInternshipsByHR());
  }, [dispatch]);

  const onViewApplications = async (id, title, isJob = true) => {
    try {
      setSelectedTitle(title);
      const applications = await dispatch(fetchApplications(id)).unwrap();
      setSelectedApplications(applications);
      setIsModalVisible(true);
    } catch (error) {
      message.error(`Failed to fetch applications: ${error.message}`);
    }
  };

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

  const handleReviewStatusChange = async () => {
    try {
      const { status } = reviewForm.getFieldsValue();
      await dispatch(reviewApplicationThunk({ applicationId: selectedApplicationId, updatedStatus: { status } })).unwrap();
      message.success('Application status updated successfully');
      setIsModalVisible(false);
      setSelectedApplications((prevApplications) =>
        prevApplications.map((app) => (app._id === selectedApplicationId ? { ...app, status } : app))
      );
    } catch (error) {
      message.error(`Failed to update application status: ${error.message}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedApplications([]);
    reviewForm.resetFields();
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
                        <Button type="link" danger onClick={() => handleJobDelete(record._id)}>
                          Delete
                        </Button>
                        <Button type="link" onClick={() => onViewApplications(record._id, record.title)}>
                          View Applications
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
                        <Button type="link" danger onClick={() => handleInternshipDelete(record._id)}>
                          Delete
                        </Button>
                        <Button type="link" onClick={() => onViewApplications(record._id, record.title, false)}>
                          View Applications
                        </Button>
                      </span>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>

          {/* Applications Modal */}
          <ApplicationsModal
            isModalVisible={isModalVisible}
            handleCloseModal={handleCloseModal}
            selectedTitle={selectedTitle}
            selectedApplications={selectedApplications}
            setSelectedApplicationId={setSelectedApplicationId}
            selectedApplicationId={selectedApplicationId}
            reviewForm={reviewForm}
            handleReviewStatusChange={handleReviewStatusChange}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
