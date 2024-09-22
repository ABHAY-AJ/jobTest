import React from 'react';
import { Form, Input, DatePicker, InputNumber, Select, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { createTpoEvent } from '../../../redux/tpo/tpoEventSlice/tpoEventSlice';

const { Option } = Select;

const CreateTpoEvent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      await dispatch(createTpoEvent(values)).unwrap(); // Dispatch the createTpoInternship action
      message.success('Event posted successfully');
      form.resetFields(); // Clear the form after success
    } catch (error) {
      message.error(`Failed to post event: ${error.message}`);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ status: 'Open', selectedColleges: ['Any'] }}
    >
      <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the event title' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select the event date' }]}>
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="venue" label="Venue" rules={[{ required: true, message: 'Please enter the event venue' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['criteria', 'education']} label="Education Criteria">
        <Input />
      </Form.Item>
      <Form.Item name={['criteria', 'location']} label="Location Criteria">
        <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
          <Option value="Any">Any</Option>
          {/* Add more options here */}
        </Select>
      </Form.Item>
      <Form.Item name={['criteria', 'dateOfBirth']} label="Date of Birth Criteria">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name={['criteria', 'academicPercentage']} label="Academic Percentage Criteria">
        <InputNumber style={{ width: '100%' }} min={0} max={100} />
      </Form.Item>
      <Form.Item name={['criteria', 'branch']} label="Branch Criteria">
        <Input />
      </Form.Item>
      <Form.Item name="college" label="College" rules={[{ required: true, message: 'Please enter the college' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="selectedColleges" label="Selected Colleges">
        <Select mode="tags" style={{ width: '100%' }} tokenSeparators={[',']}>
          <Option value="Any">Any</Option>
          {/* Add more options here */}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Status">
        <Select>
          <Option value="Open">Open</Option>
          <Option value="Closed">Closed</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Event
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTpoEvent;
