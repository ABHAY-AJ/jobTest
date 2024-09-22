import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { createTpoJob } from '../../../redux/tpo/tpoJobs/tpoJobsSlice'; // Import the createTpoJob action

const PostTpoJob = () => {
  const dispatch = useDispatch();
  
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await dispatch(createTpoJob(values)).unwrap(); // Dispatch the createTpoJob action
      message.success('Job posted successfully');
      form.resetFields(); // Clear the form after success
    } catch (error) {
      message.error(`Failed to post job: ${error.message}`);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" style={{ maxWidth: '600px', margin: 'auto' }}>
      <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Please enter the job title' }]}>
        <Input placeholder="Enter job title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter job description" />
      </Form.Item>

      <Form.Item name={['criteria', 'skills']} label="Skills">
        <Input placeholder="Enter required skills" />
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

      <Button type="primary" htmlType="submit">Post Job</Button>
    </Form>
  );
};

export default PostTpoJob;
