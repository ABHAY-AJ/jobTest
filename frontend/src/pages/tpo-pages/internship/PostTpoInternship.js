import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { createTpoInternship } from '../../../redux/tpo/tpoInternship/tpoInternshipSlice'; // Import the createTpoInternship action

const PostTpoInternship = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await dispatch(createTpoInternship(values)).unwrap(); // Dispatch the createTpoInternship action
      message.success('Internship posted successfully');
      form.resetFields(); // Clear the form after success
    } catch (error) {
      message.error(`Failed to post internship: ${error.message}`);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" style={{ maxWidth: '600px', margin: 'auto' }}>
      <Form.Item name="title" label="Internship Title" rules={[{ required: true, message: 'Please enter the internship title' }]}>
        <Input placeholder="Enter internship title" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter internship description" />
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
        <Input placeholder="Enter internship location" />
      </Form.Item>

      <Form.Item name={['criteria', 'area']} label="Area">
        <Input placeholder="Enter internship area" />
      </Form.Item>

      <Form.Item name={['criteria', 'College']} label="College">
        <Input placeholder="Enter required college(s)" />
      </Form.Item>

      <Form.Item name={['criteria', 'academicPercentage']} label="Academic Percentage">
        <Input type="number" placeholder="Enter minimum academic percentage" />
      </Form.Item>

      <Form.Item name="duration" label="Duration" rules={[{ required: true, message: 'Please enter the internship duration' }]}>
        <Input type="number" placeholder="Enter internship duration (weeks or months)" />
      </Form.Item>

      <Button type="primary" htmlType="submit">Post Internship</Button>
    </Form>
  );
};

export default PostTpoInternship;
