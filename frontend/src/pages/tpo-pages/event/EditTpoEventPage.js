// EditTpoEventPage.js
import React, { useEffect } from 'react';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTpoEventById, updateTpoEvent } from '../../../redux/tpo/tpoEventSlice/tpoEventSlice';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const EditTpoEventPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { event, loading, error } = useSelector((state) => state.tpoEvents);

  useEffect(() => {
    dispatch(fetchTpoEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        title: event.title,
        description: event.description,
        venue: event.venue,
        date: event.date ? moment(event.date) : null,
        'criteria.education': event.criteria.education,
        'criteria.location': event.criteria.location,
        'criteria.dateOfBirth': event.criteria.dateOfBirth ? moment(event.criteria.dateOfBirth) : null,
        'criteria.academicPercentage': event.criteria.academicPercentage,
        'criteria.branch': event.criteria.branch,
      });
    }
  }, [event, form]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateTpoEvent({ id, ...values })).unwrap();
      message.success('Event updated successfully');
      navigate('/tpo-dashboard'); // Redirect after successful update
    } catch (err) {
      message.error(`Error updating event: ${err.message}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event: {error}</p>;

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the event title!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Venue" name="venue">
        <Input placeholder="Event venue" />
      </Form.Item>

      <Form.Item label="Date" name="date">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Education" name={['criteria', 'education']}>
        <Input placeholder="Required education level" />
      </Form.Item>

      <Form.Item label="Location" name={['criteria', 'location']}>
        <Select mode="multiple" placeholder="Select event locations">
          <Option value="Any">Any</Option>
          <Option value="Location1">Location1</Option>
          <Option value="Location2">Location2</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Date of Birth" name={['criteria', 'dateOfBirth']}>
        <DatePicker />
      </Form.Item>

      <Form.Item label="Academic Percentage" name={['criteria', 'academicPercentage']}>
        <Input type="number" placeholder="Required academic percentage" />
      </Form.Item>

      <Form.Item label="Branch" name={['criteria', 'branch']}>
        <Input placeholder="Required branch" />
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Update Event
      </Button>
    </Form>
  );
};

export default EditTpoEventPage;
