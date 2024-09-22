import React, { useEffect } from 'react';
import { Form, Input, Button, message, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTpoJobById, updateTpoJob } from '../../../redux/tpo/tpoJobs/tpoJobsSlice';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const EditTpoJobPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure the id is correctly fetched from the URL

  const { job, loading, error } = useSelector((state) => state.tpoJobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchTpoJobById(id));
    } else {
      console.error("Job ID is missing");
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (job) {
      form.setFieldsValue({
        title: job.title,
        description: job.description,
        criteria: {
          skills: job.criteria?.skills || '',
          minExperience: job.criteria?.minExperience || null,
          education: job.criteria?.education || '',
          location: job.criteria?.location || '',
          College: job.criteria?.College || '', // Correctly initialize College field
          dateOfBirth: job.criteria?.dateOfBirth ? moment(job.criteria.dateOfBirth) : null,
          academicPercentage: job.criteria?.academicPercentage || null,
          branch: job.criteria?.branch || '',
        },
      });
    }
  }, [job, form]);

  const onFinish = async (values) => {
    try {
      // Make sure to convert dateOfBirth back to ISO format
      if (values.criteria.dateOfBirth) {
        values.criteria.dateOfBirth = values.criteria.dateOfBirth.toISOString();
      }

      await dispatch(updateTpoJob({ jobId: id, jobData: values })).unwrap(); // Pass jobId and jobData separately
      message.success('Job updated successfully');
      navigate('/tpo-dashboard'); // Redirect after successful update
    } catch (err) {
      message.error(`Error updating job: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading job: {error}</p>;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: '600px', margin: 'auto' }}
    >
      <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Please enter the job title' }]}>
        <Input placeholder="Enter job title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter job description" />
      </Form.Item>

      <Form.Item name={['criteria', 'skills']} label="Skills">
        <Input placeholder="Enter required skills (comma-separated)" />
      </Form.Item>

      <Form.Item name={['criteria', 'minExperience']} label="Minimum Experience">
        <Input type="number" placeholder="Enter minimum experience (years)" />
      </Form.Item>

      <Form.Item name={['criteria', 'education']} label="Education">
        <Input placeholder="Enter required education" />
      </Form.Item>

      <Form.Item name={['criteria', 'location']} label="Location">
        <Input placeholder="Enter job location" />
      </Form.Item>

      <Form.Item name={['criteria', 'area']} label="Area">
        <Input placeholder="Enter job area" />
      </Form.Item>

      <Form.Item name={['criteria', 'College']} label="College">
        <Input placeholder="Enter required college(s)" />
      </Form.Item>

      <Form.Item name={['criteria', 'academicPercentage']} label="Academic Percentage">
        <Input type="number" placeholder="Enter minimum academic percentage" />
      </Form.Item>

      <Form.Item name={['criteria', 'branch']} label="Branch">
        <Input placeholder="Enter required branch" />
      </Form.Item>

      <Form.Item name={['criteria', 'dateOfBirth']} label="Date of Birth">
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Button type="primary" htmlType="submit">Update Job</Button>
    </Form>
  );
};

export default EditTpoJobPage;
