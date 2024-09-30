import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Table, Button, Typography, message, Row, Col } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { fetchTpoApplications, reviewTpoApplication } from '../../../redux/tpo/studentApplications/studentTpoApplication';

const { Content } = Layout;
const { Title } = Typography;

const TpoApplicationsPage = () => {
  const { id } = useParams(); // Get job, internship, or event ID from route params
  const dispatch = useDispatch();

  // Access the state from Redux
  const { tpplications, loading, error } = useSelector((state) => state.tpplications);

  console.log("appp", tpplications);

  // Fetch tpplications when component is mounted
  useEffect(() => {
    console.log("Dispatching fetchTpoApplications with ID:", id);
    dispatch(fetchTpoApplications(id)).then((result) => {
      console.log("FetchTpoApplications Result: ", result);
    });
  }, [dispatch, id]);

  // Handle reviewing the application
  const handleReview = async (applicationId, reviewData) => {
    try {
      await dispatch(reviewTpoApplication({ applicationId, reviewData })).unwrap();
      message.success('Application reviewed successfully');
    } catch (error) {
      message.error(`Failed to review application: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tpplications: {error}</p>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>TPO Applications</Title>

        {/* Responsive layout using Row and Col */}
        <Row gutter={16}>
          <Col xs={24} md={24}>
            {/* Applications Table */}
            <Table
              dataSource={tpplications}
              rowKey="_id"
              pagination={{ pageSize: 5 }} // Optional: Adjust pagination for better readability
              scroll={{ x: '100%' }} // Enable horizontal scrolling
            >
              <Table.Column
                title="Name"
                dataIndex={['student', 'name']}
                key="student.name"
                render={(text, record) => (
                  <Link to={`/student/${record.student._id}`}>{text}</Link>
                )}
              />
              <Table.Column title="Email" dataIndex={['student', 'email']} key="student.email" />
              <Table.Column title="Score" dataIndex="score" key="score" />
              <Table.Column
                title="Actions"
                key="actions"
                render={(text, record) => (
                  <span>
                    <Button type="link" onClick={() => handleReview(record._id, { status: 'Accepted' })}>
                      Accept
                    </Button>
                    <Button type="link" onClick={() => handleReview(record._id, { status: 'Rejected' })} danger>
                      Reject
                    </Button>
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TpoApplicationsPage;
