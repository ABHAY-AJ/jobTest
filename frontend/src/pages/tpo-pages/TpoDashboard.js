import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Row, Col, Card, Button, Table, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { deleteTpoJob, fetchJobsByTPO } from "../../redux/tpo/tpoJobs/tpoJobsSlice";
import { deleteTpoInternship, fetchInternshipsByTPO } from '../../redux/tpo/tpoInternship/tpoInternshipSlice';
import { deleteTpoEvent, fetchEventsByTPO } from '../../redux/tpo/tpoEventSlice/tpoEventSlice';

const { Content } = Layout;
const { Title } = Typography;

const TpoDashboard = () => {
  const dispatch = useDispatch();

  // Fetch jobs, internships, and events from Redux store
  const { jobs, loading: jobsLoading, error: jobsError } = useSelector((state) => state.tpoJobs);
  const { internships, loading: internshipsLoading, error: internshipsError } = useSelector((state) => state.tpoInternships);
  const { events, loading: eventsLoading, error: eventsError } = useSelector((state) => state.tpoEvents);

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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>TPO Dashboard</Title>
        <Row gutter={16} style={{ marginBottom: '16px' }}>
          <Col xs={24} sm={8}>
            <Button type="primary" style={{ marginBottom: '16px', width: '100%' }}>
              <Link to="/create-tpo-job" style={{ textDecoration: 'none' }}>Post New Tpo Job</Link>
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button type="primary" style={{ marginBottom: '16px', width: '100%' }}>
              <Link to="/create-tpo-internship" style={{ textDecoration: 'none' }}>Post New Tpo Internship</Link>
            </Button>
          </Col>
          <Col xs={24} sm={8}>
            <Button type="primary" style={{ marginBottom: '16px', width: '100%' }}>
              <Link to="/create-tpo-event" style={{ textDecoration: 'none' }}>Post New Tpo Event</Link>
            </Button>
          </Col>
        </Row>

        {/* Jobs Management */}
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Tpo Jobs Management" className="mb-3">
              <Table dataSource={jobs} rowKey="_id" pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }}>
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
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Internships Management */}
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Tpo Internships Management" className="mb-3">
              <Table dataSource={internships} rowKey="_id" pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }}>
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
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Events Management */}
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Tpo Events Management" className="mb-3">
              <Table dataSource={events} rowKey="_id" pagination={{ pageSize: 5 }} scroll={{ x: 'max-content' }}>
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
                    </span>
                  )}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TpoDashboard;
