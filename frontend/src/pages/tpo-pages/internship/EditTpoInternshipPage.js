import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTpoInternshipById, updateTpoInternship } from '../../../redux/tpo/tpoInternship/tpoInternshipSlice';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const EditTpoInternshipPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { internship, loading, error } = useSelector((state) => state.tpoInternships);

  useEffect(() => {
    dispatch(fetchTpoInternshipById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (internship) {
      form.setFieldsValue({
        title: internship.title,
        description: internship.description,
        criteria: {
          skills: internship.criteria.skills || '',
          minExperience: internship.criteria.minExperience || null,
          education: internship.criteria.education || '',
          location: internship.criteria.location || '',
          College: internship.criteria.College || '',
          dateOfBirth: internship.criteria.dateOfBirth ? moment(internship.criteria.dateOfBirth) : null,
          academicPercentage: internship.criteria.academicPercentage || null,
        },
        duration: internship.duration || '',
      });
    }
  }, [internship, form]);

  const onFinish = async (values) => {
    try {
      // Convert dateOfBirth back to ISO format for submission
      if (values.criteria.dateOfBirth) {
        values.criteria.dateOfBirth = values.criteria.dateOfBirth.toISOString();
      }

      await dispatch(updateTpoInternship({ internshipId: id, updates: values })).unwrap();
      message.success('Internship updated successfully');
      navigate('/tpo-dashboard'); // Redirect after successful update
    } catch (err) {
      message.error(`Error updating internship: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading internship: {error}</p>;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: '600px', margin: 'auto' }}
    >
      <Form.Item
        name="title"
        label="Internship Title"
        rules={[{ required: true, message: 'Please enter the internship title' }]}
      >
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
        <Input placeholder="Enter internship Area" />
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

      <Button type="primary" htmlType="submit">Update Internship</Button>
    </Form>
  );
};

export default EditTpoInternshipPage;
