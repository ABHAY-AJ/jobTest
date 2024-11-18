import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import { createInternship } from '../../../redux/internship-slices/internshipSlice';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateInternship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    try {
      await dispatch(createInternship(values)).unwrap();
      message.success('Internship created successfully');
      navigate('/dashboard'); // Redirect to the dashboard or any other page
    } catch (error) {
      message.error(`Failed to create internship: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <h2>Create New Internship</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ duration: 'Any' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input placeholder="Enter internship title" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Description"
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>
        
        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: 'Please enter the duration' }]}
        >
          <Input placeholder="Enter duration" />
        </Form.Item>
        
        <Form.Item
          name={['criteria', 'skills']}
          label="Skills"
        >
          <Select mode="multiple" placeholder="Select required skills">
            <Option value="JavaScript">JavaScript</Option>
            <Option value="Python">Python</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name={['criteria', 'minExperience']}
          label="Minimum Experience (years)"
        >
          <Input type="number" placeholder="Enter minimum experience" />
        </Form.Item>

        <Form.Item
          name={['criteria', 'education']}
          label="Education"
        >
          <Input placeholder="Enter required education" />
        </Form.Item>

        <Form.Item
          name={['criteria', 'location']}
          label="Location"
        >
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item
          name={['criteria', 'area']}
          label="Area"
        >
          <Input placeholder="Enter Area" />
        </Form.Item>

        <Form.Item
          name={['criteria', 'College']}
          label="College"
        >
          <Select mode="multiple" placeholder="Select preferred colleges">
            <Option value="College A">College A</Option>
            <Option value="College B">College B</Option>
            {/* Add more options as needed */}
          </Select>
        </Form.Item>

        <Form.Item
          name={['criteria', 'dateOfBirth']}
          label="Date of Birth"
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name={['criteria', 'academicPercentage']}
          label="Academic Percentage"
        >
          <Input type="number" placeholder="Enter academic percentage" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Create Internship</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateInternship;
