import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById, updateJob } from '../../../redux/jobs-slices/jobSlice';
import { Form, Input, Button, message } from 'antd';

const EditJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading, error } = useSelector((state) => state.jobs);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (job) {
      form.setFieldsValue(job);
    }
  }, [job, form]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateJob({ id, jobData: values })).unwrap();
      message.success('Job updated successfully');
    } catch (error) {
      message.error(`Failed to update job: ${error.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the job title!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the job description!' }]}>
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Update Job
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditJob;
