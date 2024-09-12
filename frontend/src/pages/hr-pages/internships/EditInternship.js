import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchInternshipById, updateInternship } from '../../../redux/internship-slices/internshipSlice';
import moment from "moment";

const { Option } = Select;

const EditInternship = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate instead of history
  const { id } = useParams();
  const [form] = Form.useForm();

  const { internship, loading, error } = useSelector((state) => state.internships);

  useEffect(() => {
    dispatch(fetchInternshipById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (internship) {
      form.setFieldsValue({
        ...internship,
        criteria: {
          ...internship.criteria,
          dateOfBirth: internship.criteria.dateOfBirth ? moment(internship.criteria.dateOfBirth) : null,
        },
      });
    }
  }, [internship, form]);

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      criteria: {
        ...values.criteria,
        dateOfBirth: values.criteria.dateOfBirth ? values.criteria.dateOfBirth.format('YYYY-MM-DD') : null,
      },
    };
  
    try {
      await dispatch(updateInternship({ id, updatedData: formattedValues })).unwrap();
      message.success('Internship updated successfully');
      navigate('/dashboard');
    } catch (error) {
      message.error(`Failed to update internship: ${error.message}`);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading internship: {error}</p>;

  return (
    <div style={{ padding: '24px', background: '#fff' }}>
      <h2>Edit Internship</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
          <Button type="primary" htmlType="submit">Update Internship</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditInternship;
