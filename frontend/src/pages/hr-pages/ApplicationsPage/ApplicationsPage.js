// src/pages/ApplicationsPage.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchApplications, reviewApplicationThunk } from '../../../redux/application/applicationSlice'; // Adjust import based on file structure

const { Option } = Select;

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams(); // Get jobId from URL params
  const [reviewForm] = Form.useForm();
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const { applications, loading, error } = useSelector((state) => state.applications);

  // const ans = fetchApplications(jobId);
  console.log("cvbn",applications)

  useEffect(() => {
    dispatch(fetchApplications(jobId)).unwrap(); // Fetch applications for the job or internship
  }, [dispatch, jobId]);

  const handleReviewStatusChange = async () => {
    try {
      const { status } = reviewForm.getFieldsValue();
      await dispatch(reviewApplicationThunk({ applicationId: selectedApplicationId, updatedStatus: { status } })).unwrap();
      message.success('Application status updated successfully');
    } catch (error) {
      message.error(`Failed to update application status: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading applications: {error}</p>;

  return (
    <div>
      <h2>Applications for {jobId}</h2>
      <Table
        dataSource={applications}
        rowKey="_id"
        rowClassName="custom-hover-row"
        onRow={(record) => ({
          onClick: () => {
            setSelectedApplicationId(record._id);
            reviewForm.setFieldsValue({ status: record.status });
          },
        })}
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
        <Table.Column title="Score" dataIndex="score" key="score" />
        <Table.Column title="Status" dataIndex="status" key="status" />
      </Table>

      {selectedApplicationId && (
        <Form form={reviewForm} layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item name="status" label="Review Status">
            <Select placeholder="Select a status">
              <Option value="Pending">Pending</Option>
              <Option value="Reviewed">Reviewed</Option>
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
    </div>
  );
};

export default ApplicationsPage;
