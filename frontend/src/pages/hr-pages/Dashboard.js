import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Card, Button, Table, Typography, message, Form, Modal } from 'antd';
import { fetchJobsByHR, deleteJob } from '../../redux/jobs-slices/jobSlice';
import { deleteInternship, fetchInternshipsByHR } from '../../redux/internship-slices/internshipSlice';
import { fetchApplications, reviewApplicationThunk } from '../../redux/application/applicationSlice';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationsModal from "./ApplicationsPage/ApplicationsPage";
import axios from 'axios';

import "./hh.css";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [invitations, setInvitations] = useState([]);
  const [acceptedJob, setAcceptedJob] = useState(null); // Store accepted job information
  const [isJobOptionVisible, setIsJobOptionVisible] = useState(false); // State for job options modal
  const [authorizedJobs, setJobs] = useState([]);
  const [authorizedInternships, setInternships] = useState([]); // State for authorized internships
  const [authorizedEvents, setEvents] = useState([]); // State for authorized events

  const {userInfo} = useSelector((state) => state.user);
  const hremail = "hr@gmail.com";
  const navigate = useNavigate();
  console.log("userrr",userInfo)
 
  const fetchAuthorizedData = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/invitations/authorized-resources', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
  
      console.log("data", data);
  
      // Filter invitations with 'Accepted' status
      const acceptedJobIds = data.invitations
        .filter(invitation => invitation.jobId && invitation.status === 'Accepted')
        .map(invitation => invitation.jobId);
  
      const acceptedInternshipIds = data.invitations
        .filter(invitation => invitation.internshipId && invitation.status === 'Accepted')
        .map(invitation => invitation.internshipId);
  
      const acceptedEventIds = data.invitations
        .filter(invitation => invitation.eventId && invitation.status === 'Accepted')
        .map(invitation => invitation.eventId);
  
      // Filter jobs, internships, and events based on accepted invitations
      const acceptedJobs = data.jobs.filter(job => acceptedJobIds.includes(job._id));
      const acceptedInternships = data.internships.filter(internship => acceptedInternshipIds.includes(internship._id));
      const acceptedEvents = data.events.filter(event => acceptedEventIds.includes(event._id));
  
      // Set the filtered data
      setJobs(acceptedJobs);
      setInternships(acceptedInternships);
      setEvents(acceptedEvents);
      
    } catch (error) {
      console.error('Failed to fetch authorized data', error.message);
    }
  };
  
  useEffect(() => {
    fetchInvitations();
    dispatch(fetchJobsByHR()); 
    dispatch(fetchInternshipsByHR());
    fetchAuthorizedData(); // Fetch authorized data on load
  }, [dispatch]);
  console.log("eeemail",hremail)

  // Fetch invitations for HR
  const fetchInvitations = async () => {
    try {
      const hrEmail = "hr@gmail.com"; // Replace with logged-in HR's email
      console.log("eeeeeeeeeeeeee",hrEmail)
      const response = await axios.get(`http://localhost:5000/api/v1/invitations/invitations/${hrEmail}`);
      setInvitations(response.data);
    } catch (error) {
      message.error('Failed to load invitations');
    }
  };

  // Respond to HR invitation
  const respondToInvitation = async (id, status, jobId) => {
    try {
      await axios.put(`http://localhost:5000/api/v1/invitations/invitation/${id}/respond`, { status });
      message.success(`Invitation ${status}`);
      fetchInvitations(); // Refresh the invitations
  
      if (status === 'Accepted') {
        // After accepting, refresh the authorized data
        fetchAuthorizedData();
      }
    } catch (error) {
      message.error('Failed to respond to invitation');
    }
  };
  


  const handleJobOptionClose = () => {
    setIsJobOptionVisible(false);
    setAcceptedJob(null); // Clear accepted job
  };

  // When the user clicks to view or edit
  const handleViewJob = () => {
    handleJobOptionClose();
    window.location.href = `/jobs/${acceptedJob._id}`; // Redirect to view job
  };

  const handleEditJob = () => {
    handleJobOptionClose();
    window.location.href = `/edit-job/${acceptedJob._id}`; // Redirect to edit job
  };

  const [reviewForm] = Form.useForm();

  const { jobs = [], loading: jobLoading = false, error: jobError = null } = useSelector((state) => state.jobs || {});
  const { internships = [], loading: internshipLoading = false, error: internshipError = null } = useSelector((state) => state.internships || {});

  useEffect(() => {
    dispatch(fetchJobsByHR());
    dispatch(fetchInternshipsByHR());
  }, [dispatch]);


  const onViewApplications = (id) => {
    // Navigate to the applications page
    navigate(`/applications/${id}`);
  };

  const onViewTpoApplications = (id) => {
    // Navigate to the applications page
    navigate(`/tpo-applications/${id}`);
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

  // Trigger Job Options Modal whenever acceptedJob state changes
  useEffect(() => {
    if (acceptedJob) {
      setIsJobOptionVisible(true);
    }
  }, [acceptedJob]);

  if (jobLoading || internshipLoading) return <p>Loading...</p>;
  if (jobError) return <p>Error loading jobs: {jobError}</p>;
  if (internshipError) return <p>Error loading internships: {internshipError}</p>;
  console.log("invitations",invitations)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Content style={{ padding: '24px', background: '#fff' }}>
          <Title level={2}>Dashboard</Title>

          {/* HR Invitations */}
          <div>
            <h2>HR Invitations</h2>
            <Table dataSource={invitations || []} rowKey="_id">
              <Table.Column title="Job" dataIndex="jobId.title" key="jobId.title" />
              <Table.Column title="Status" dataIndex="status" key="status" />
              <Table.Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <span>
                    {record.status === 'Pending' && (
                      <>
                        <Button onClick={() => respondToInvitation(record._id, 'Accepted', record.jobId)} type="primary">
                          Accept
                        </Button>
                        <Button onClick={() => respondToInvitation(record._id, 'Rejected')} type="danger" style={{ marginLeft: '8px' }}>
                          Reject
                        </Button>
                      </>
                    )}
                  </span>
                )}
              />
            </Table>
          </div>

{/* Authorized Jobs Section */}
<div>
  <h2>Authorized Jobs</h2>
  <Table dataSource={authorizedJobs || []} rowKey="_id">
    <Table.Column title="Title" dataIndex="title" key="title" />
    <Table.Column title="Description" dataIndex="description" key="description" />
    <Table.Column
      title="Actions"
      key="actions"
      render={(text, record) => (
        <span>
          <Button type="link">
            <Link to={`/tpo-jobs/${record._id}`}>View</Link>
          </Button>
          <Button type="link">
            <Link to={`/edit-tpo-job/${record._id}`}>Edit</Link>
          </Button>
          <Button type="link" onClick={() => onViewTpoApplications(record._id, record.title)}>
                            View Applications
                          </Button>
        </span>
      )}
    />
  </Table>
</div>

{/* Authorized Internships Section */}
<div>
  <h2>Authorized Internships</h2>
  <Table dataSource={authorizedInternships || []} rowKey="_id">
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
          <Button type="link" onClick={() => onViewTpoApplications(record._id, record.title)}>
                            View Applications
                          </Button>
        </span>
      )}
    />
  </Table>
</div>

{/* Authorized Events Section */}
<div>
  <h2>Authorized Events</h2>
  <Table dataSource={authorizedEvents || []} rowKey="_id">
    <Table.Column title="Title" dataIndex="title" key="title" />
    <Table.Column title="Description" dataIndex="description" key="description" />
    <Table.Column
      title="Actions"
      key="actions"
      render={(text, record) => (
        <span>
          <Button type="link">
            <Link to={`/events/${record._id}`}>View</Link>
          </Button>
          <Button type="link">
            <Link to={`/edit-event/${record._id}`}>Edit</Link>
          </Button>
          <Button type="link" onClick={() => onViewTpoApplications(record._id, record.title)}>
                            View Applications
                          </Button>
        </span>
      )}
    />
  </Table>
</div>



          {/* Jobs Management Section */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Jobs Management" className="mb-3">
                <div style={{ overflowX: 'auto' }}>
                  <Table
                    dataSource={jobs || []}
                    rowKey="_id"
                    pagination={{ responsive: true }}
                    className="custom-hover-row"
                    scroll={{ x: 600 }}
                  >
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
                </div>
              </Card>
            </Col>
          </Row>

          {/* Internships Management Section */}
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Internships Management" className="mb-3">
                <div style={{ overflowX: 'auto' }}>
                  <Table
                    dataSource={internships || []}
                    rowKey="_id"
                    pagination={{ responsive: true }}
                    className="custom-hover-row"
                    scroll={{ x: 600 }}
                  >
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
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
