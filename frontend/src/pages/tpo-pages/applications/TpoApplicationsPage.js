import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Form, Select, Typography, message, Row, Col } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTpoApplications, reviewTpoApplication } from '../../../redux/tpo/studentApplications/studentTpoApplication';

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const TpoApplicationsPage = () => {
  const { id } = useParams(); // Get job, internship, or event ID from route params
  const dispatch = useDispatch();
  const [applicationsLocal, setApplicationsLocal] = useState([]); // Local state for applications
  const [selectedApplicationId, setSelectedApplicationId] = useState(null); // Track selected application
  const [reviewForm] = Form.useForm(); // Form instance for review
  const { tpplications, loading, error } = useSelector((state) => state.tpplications);

  // Fetch applications when component is mounted
  useEffect(() => {
    dispatch(fetchTpoApplications(id)).unwrap().then((fetchedApplications) => {
      setApplicationsLocal(fetchedApplications); // Set local applications state
    });
  }, [dispatch, id]);

  // Handle review status change and optimistically update local state
  const handleReviewStatusChange = async () => {
    try {
      const { status } = reviewForm.getFieldsValue(); // Get selected status from form
      await dispatch(reviewTpoApplication({ applicationId: selectedApplicationId, reviewData: { status } })).unwrap();
      console.log("selectedApplicationId",selectedApplicationId)

      // Optimistically update local applications
      setApplicationsLocal((prevApplications) =>
        prevApplications.map((application) =>
          application._id === selectedApplicationId ? { ...application, status } : application
        )
      );

      message.success('Application status updated successfully');
    } catch (error) {
      message.error(`Failed to update application status: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading applications: {error}</p>;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', background: '#fff' }}>
        <Title level={2}>TPO Applications</Title>

        {/* Responsive layout using Row and Col */}
        <Row gutter={16}>
          <Col xs={24} md={24}>
            <Table
              dataSource={applicationsLocal} // Use local state for data source
              rowKey="_id"
              rowClassName="custom-hover-row"
              onRow={(record) => ({
                onClick: () => {
                  setSelectedApplicationId(record._id); // Set selected application ID
                  reviewForm.setFieldsValue({ status: record.status }); // Set form status value based on selected application
                },
              })}
              pagination={{ pageSize: 5 }} // Optional: Adjust pagination for better readability
              scroll={{ x: '100%' }} // Enable horizontal scrolling
            >
              <Table.Column
                title="Student Name"
                dataIndex={['student', 'name']}
                key="studentName"
                render={(name, record) => (
                  <Button type="link">
                    <Link to={`/student/${record.student._id}`}>{name}</Link>
                  </Button>
                )}
              />
              <Table.Column title="Email" dataIndex={['student', 'email']} key="student.email" />
              <Table.Column title="Score" dataIndex="score" key="score" />
              <Table.Column title="Status" dataIndex="status" key="status" />
            </Table>

            {/* Conditional rendering for the review form */}
            {selectedApplicationId && (
              <Form form={reviewForm} layout="vertical" style={{ marginTop: '20px' }}>
                <Form.Item name="status" label="Review Status">
                  <Select placeholder="Select a status">
                    <Option value="Pending">Pending</Option>
                    <Option value="Accepted">Accepted</Option>
                    <Option value="Rejected">Rejected</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" onClick={handleReviewStatusChange}>
                    Update Status
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default TpoApplicationsPage;
