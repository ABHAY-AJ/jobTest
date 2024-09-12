// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Internships from './pages/Internships';
import InternshipDetail from './pages/InternshipDetail';
import Profile from './pages/Profile';
import Dashboard from './pages/hr-pages/Dashboard';
import CreateJob from './pages/hr-pages/jobs/createJob';
import EditJob from './pages/hr-pages/jobs/EditJob';
import EditInternship from './pages/hr-pages/internships/EditInternship';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/user-slices/authSlice';
import CreateInternship from './pages/hr-pages/internships/CreateInternship';
import StudentDashboard from './pages/student-pages/StudentDashboard';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.user); // Access token and role

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <a href="/">Home</a>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <a href="/jobs">Jobs</a>,
    },
    {
      key: '3',
      icon: <VideoCameraOutlined />,
      label: <a href="/internships">Internships</a>,
    },
    ...(token
      ? [
          role === 'student'
            ? {
                key: '4',
                icon: <UserOutlined />,
                label: <a href="/student-dashboard">Student Dashboard</a>,
              }
            : {
                key: '4',
                icon: <UserOutlined />,
                label: <a href="/dashboard">HR Dashboard</a>,
              },
          {
            key: '5',
            icon: <UserOutlined />,
            label: <a href="/profile">Profile</a>,
          },
          {
            key: '6',
            icon: <LogoutOutlined />,
            label: <a onClick={handleLogout} href='/'>Logout</a>,
          },
        ]
      : [
          {
            key: '7',
            icon: <LoginOutlined />,
            label: <a href="/login">Login</a>,
          },
          {
            key: '8',
            icon: <UserOutlined />,
            label: <a href="/signup">Signup</a>,
          },
        ]
    ),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        style={{
          position: 'fixed',
          height: '100%',
          left: 0,
          top: 0,
          transition: 'all 0.3s',
          overflow: 'auto',
          zIndex: 1,
        }}
      >
        <div className="logo" style={{ padding: '20px', color: 'white', textAlign: 'center' }}>StackPop</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menuItems}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'margin-left 0.3s' }}>
        <Header
          style={{
            padding: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: "fixed",
            borderRadius: "10px"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '0',
            padding: '24px',
            minHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/internships/:id" element={<InternshipDetail />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/student-dashboard" element={<PrivateRoute component={StudentDashboard} />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/edit-job/:id" element={<EditJob />} />
            <Route path="/create-internship" element={<CreateInternship />} />
            <Route path="/edit-internship/:id" element={<EditInternship />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
