import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Card, Button, Table, Typography, message, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { deleteTpoJob, fetchJobsByTPO } from "../../redux/tpo/tpoJobs/tpoJobsSlice";
import { deleteTpoInternship, fetchInternshipsByTPO } from '../../redux/tpo/tpoInternship/tpoInternshipSlice';
import { deleteTpoEvent, fetchEventsByTPO } from '../../redux/tpo/tpoEventSlice/tpoEventSlice';
import axios from 'axios';
import { getProfile } from '../../redux/user-slices/userSlice';

const { Content } = Layout;
const { Title } = Typography;

const TpoDashboard = () => {
  const dispatch = useDispatch();

  const [hrEmail, setHrEmail] = useState('');
  const [selectedResourceId, setSelectedResourceId] = useState(null);
  const [resourceType, setResourceType] = useState(''); // 'job', 'internship', or 'event'
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);

  // Fetch jobs, internships, and events from Redux store
  const { jobs, loading: jobsLoading, error: jobsError } = useSelector((state) => state.tpoJobs);
  const { internships, loading: internshipsLoading, error: internshipsError } = useSelector((state) => state.tpoInternships);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.tpoEvents);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const { userInfo } = useSelector((state) => state.user);
  const tpoId = userInfo ? userInfo._id : null;
  console.log("tpo iddddddd",userInfo)

  useEffect(() => {
    dispatch(fetchJobsByTPO()); // Fetch TPO jobs
    dispatch(fetchInternshipsByTPO()); // Fetch TPO internships
    dispatch(fetchEventsByTPO()); // Fetch TPO events
  }, [dispatch]);

  const handleJobDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this job?')) {
        await dispatch(deleteTpoJob(id)).unwrap();
        message.success('Job deleted successfully');
      }
    } catch (error) {
      message.error(`Failed to delete job: ${error.message}`);
    }
  };

  const handleInternshipDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this internship?')) {
        await dispatch(deleteTpoInternship(id)).unwrap();
        message.success('Internship deleted successfully');
      }
    } catch (error) {
      message.error(`Failed to delete internship: ${error.message}`);
    }
  };

  const handleEventDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this event?')) {
        await dispatch(deleteTpoEvent(id)).unwrap();
        message.success('Event deleted successfully');
      }
    } catch (error) {
      message.error(`Failed to delete event: ${error.message}`);
    }
  };

  if (jobsLoading || internshipsLoading || eventsLoading) return <p>Loading...</p>;
  if (jobsError) return <p>Error loading jobs: {jobsError}</p>;
  if (internshipsError) return <p>Error loading internships: {internshipsError}</p>;
  if (eventsError) return <p>Error loading events: {eventsError}</p>;

  const handleInvite = async () => {
    console.log('HR Email:', hrEmail, 'TPO ID:', tpoId, 'Resource Type:', resourceType); // Debug
    try {
      const payload = {
        hrEmail,
        tpoId, // The TPO ID fetched from the logged-in user
      };
  
      if (resourceType === 'job') {
        payload.jobId = selectedResourceId;
      } else if (resourceType === 'internship') {
        payload.internshipId = selectedResourceId;
      } else if (resourceType === 'event') {
        payload.eventId = selectedResourceId;
      }
  
      await axios.post('http://localhost:5000/api/v1/invitations/invite', payload);
      message.success('HR invited successfully');
      setIsInviteModalVisible(false);
    } catch (error) {
      message.error('Failed to invite HR');
    }
  };
  

  const showInviteModal = (resourceId, type) => {
    console.log('Resource ID:', resourceId, 'Resource Type:', type); // Add this for debugging
    setSelectedResourceId(resourceId);
    setResourceType(type);
    setIsInviteModalVisible(true);
  };
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>TPO Dashboard</Title>
        <Row gutter={24} style={{ marginBottom: '16px' }}>
          <Col span={24}>
            <Button type="primary" style={{ marginBottom: '16px' }}>
              <Link to="/create-tpo-job" style={{ textDecoration: 'none' }}>Post New Tpo Job</Link>
            </Button>
            <Button type="primary" style={{ marginBottom: '16px', marginLeft: '16px' }}>
              <Link to="/create-tpo-internship" style={{ textDecoration: 'none' }}>Post New Tpo Internship</Link>
            </Button>
            <Button type="primary" style={{ marginBottom: '16px', marginLeft: '16px' }}>
              <Link to="/create-tpo-event" style={{ textDecoration: 'none' }}>Post New Tpo Event</Link>
            </Button>
          </Col>
        </Row>

        {/* Jobs Management */}
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Tpo Jobs Management" className="mb-3">
              <Table dataSource={jobs} rowKey="_id">
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
                      <Button type="link">
                        <Link to={`/tpo-applications/${record._id}`}>View Applications</Link>
                      </Button>
                      <Button type="link" danger onClick={() => handleJobDelete(record._id)}>
                        Delete
                      </Button>
                      <Button type="link" onClick={() => showInviteModal(record._id, 'job')}>
                        Invite HR
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Internships Management */}
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Tpo Internships Management" className="mb-3">
              <Table dataSource={internships} rowKey="_id">
                <Table.Column title="Title" dataIndex="title" key="title" />
                <Table.Column title="Description" dataIndex="description" key="description" />
                <Table.Column
                  title="Actions"
                  key="actions"
                  render={(text, record) => (
                    <span>
                      <Button type="link">
                        <Link to={`/tpo-internships/${record._id}`}>View</Link>
                      </Button>
                      <Button type="link">
                        <Link to={`/edit-tpo-internship/${record._id}`}>Edit</Link>
                      </Button>
                      <Button type="link">
                        <Link to={`/tpo-applications/${record._id}`}>View Applications</Link>
                      </Button>
                      <Button type="link" danger onClick={() => handleInternshipDelete(record._id)}>
                        Delete
                      </Button>
                      <Button type="link" onClick={() => showInviteModal(record._id, 'internship')}>
                        Invite HR
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Events Management */}
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Tpo Events Management" className="mb-3">
              <Table dataSource={events} rowKey="_id">
                <Table.Column title="Title" dataIndex="title" key="title" />
                <Table.Column title="Description" dataIndex="description" key="description" />
                <Table.Column
                  title="Actions"
                  key="actions"
                  render={(text, record) => (
                    <span>
                      <Button type="link">
                        <Link to={`/tpo-events/${record._id}`}>View</Link>
                      </Button>
                      <Button type="link" onClick={() => window.open(`/tpo-applications/${record._id}`, '_blank')}>
                        View Applications
                      </Button>
                      <Button type="link" danger onClick={() => handleEventDelete(record._id)}>
                        Delete
                      </Button>
                      <Button type="link" onClick={() => showInviteModal(record._id, 'event')}>
                        Invite HR
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Invite HR"
          visible={isInviteModalVisible}
          onCancel={() => setIsInviteModalVisible(false)}
          onOk={handleInvite}
        >
          <Input
            placeholder="Enter HR Email"
            value={hrEmail}
            onChange={(e) => setHrEmail(e.target.value)}
          />
        </Modal>
      </Content>
    </Layout>
  );
};

export default TpoDashboard;
