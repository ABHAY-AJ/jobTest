// src/components/Jobs/CreateJob.js
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Select, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateJob = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    navigate('/review-job', { state: { jobDetails: values } });
  };

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <h2>Create New Job</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Job Title" rules={[{ required: true, message: 'Please input the job title!' }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name="description" label="Job Description" rules={[{ required: true, message: 'Please input the job description!' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>
        
        <Form.Item name="criteria.skills" label="Skills">
          <Select mode="tags" placeholder="Add skills" style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item name="criteria.minExperience" label="Minimum Experience (years)">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item name="criteria.education" label="Education">
          <Input />
        </Form.Item>
        
        <Form.Item name="criteria.location" label="Location">
          <Input />
        </Form.Item>

        <Form.Item name="criteria.area" label="Area">
          <Input />
        </Form.Item>
        
        <Form.Item name="criteria.College" label="College">
          <Select mode="tags" placeholder="Add colleges" style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item name="criteria.dateOfBirth" label="Date of Birth">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item name="criteria.academicPercentage" label="Academic Percentage">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Review Job
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateJob;
