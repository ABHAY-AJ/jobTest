import React, { useState } from 'react';
import { Form, Input, Button, Typography, Checkbox, notification, Divider, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../redux/user-slices/userSlice"; // Import the async action
import "./Login.css"

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { error, token, role } = useSelector((state) => state.user); // Access the user state

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Dispatch async loginUser action and await the result
      const resultAction = await dispatch(loginUser({ email: values.email, password: values.password }));
  
      if (loginUser.fulfilled.match(resultAction)) {
        // Show success notification
        notification.success({
          message: 'Login Successful',
          description: 'You have logged in successfully.',
        });
  
        // Navigate based on role
        if (resultAction.payload.role === 'student') {
          navigate('/student-dashboard');
        } else if (resultAction.payload.role === 'hr') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        throw new Error(resultAction.payload || 'Login failed');
      }
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: error.message || 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-container">
      <Card
        className="login-card"
        title={<Title level={2}>Sign In</Title>}
        extra={<div style={{ textAlign: 'center' }}>Sign in to your account</div>}
      >
        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'The input is not a valid email!' },
            ]}
          >
            <Input placeholder="your@email.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password placeholder="••••••" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="/forgot-password" style={{ float: 'right' }}>Forgot your password?</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Sign in
            </Button>
          </Form.Item>

          <Form.Item>
            <Text style={{ textAlign: 'center' }}>
              Don't have an account? <a href="/signup">Sign up</a>
            </Text>
          </Form.Item>

          <Divider>or</Divider>

          <Row gutter={16}>
            <Col xs={12} sm={12}>
              <Button
                type="default"
                icon={<FcGoogle />}
                block
                onClick={() => alert('Sign in with Google')}
              >
                Sign in with Google
              </Button>
            </Col>
            <Col xs={12} sm={12}>
              <Button
                type="default"
                icon={<FaFacebook />}
                block
                onClick={() => alert('Sign in with Facebook')}
              >
                Sign in with Facebook
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
