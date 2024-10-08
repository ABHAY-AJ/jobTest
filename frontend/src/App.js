// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { SiLibreofficewriter } from "react-icons/si";
import { HiAcademicCap } from "react-icons/hi2";
import { Button, Layout, Menu, theme, Drawer } from 'antd';
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
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/user-slices/authSlice';
import CreateInternship from './pages/hr-pages/internships/CreateInternship';
import StudentDashboard from './pages/student-pages/StudentDashboard';
import StudentProfile from './pages/hr-pages/StudentProfile/StudentProfile';
import TpoEventsPage from './pages/TpoEventsPage';
import TpoInternshipsPage from './pages/TpoInternshipsPage';
import AllTpoJobs from './pages/AllTpoJobs';
import TpoDashboard from './pages/tpo-pages/TpoDashboard';
import PostTpoJob from './pages/tpo-pages/jobs/PostTpoJob';
import PostTpoInternship from './pages/tpo-pages/internship/PostTpoInternship';
import TpoJobDetail from './pages/TpoJobDetails';
import CreateTpoEvent from './pages/tpo-pages/event/CreateTpoEvent';
import TpoInternshipDetail from './pages/TpoInternshipDetail';
import EditTpoJobPage from './pages/tpo-pages/jobs/EditTpoJobPage';
import EditTpoInternshipPage from './pages/tpo-pages/internship/EditTpoInternshipPage';
import EditTpoEventPage from "./pages/tpo-pages/event/EditTpoEventPage";
import TpoEventDetail from './pages/TpoEventDetail';
import TpoApplicationsPage from './pages/tpo-pages/applications/TpoApplicationsPage';
import ApplicationsPage from './pages/hr-pages/ApplicationsPage/ApplicationsPage';
import Chat from "./pages/Chat/Chat"


const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    dispatch(logout());
  };

  const dashboardPath =
    role === 'Student' ? '/student-dashboard' :
      role === 'HR' ? '/dashboard' :
        role === 'TPO' ? '/tpo-dashboard' : '/';

  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    ...(token && role !== 'Student' ? [] : [
      {
        key: '2',
        icon: <SiLibreofficewriter />,
        label: <Link to="/jobs">Jobs</Link>,
      },
      {
        key: '3',
        icon: <VideoCameraOutlined />,
        label: <Link to="/internships">Internships</Link>,
      },
      {
        key: '4',
        icon: <HiAcademicCap />,
        label: <Link to="/tpo-jobs">Tpo Jobs</Link>,
      },
      {
        key: '5',
        icon: <VideoCameraOutlined />,
        label: <Link to="/tpo-internships">Tpo Internships</Link>,
      },
      {
        key: '6',
        icon: <VideoCameraOutlined />,
        label: <Link to="/tpo-events">Tpo Events</Link>,
      },
    ]),
    ...(token
      ? [
        {
          key: '7',
          icon: <UserOutlined />,
          label: <Link to={dashboardPath}>Dashboard</Link>,
        },
        {
          key: '8',
          icon: <UserOutlined />,
          label: <Link to="/profile">Profile</Link>,
        },
        {
          key: '9',
          icon: <LogoutOutlined />,
          label: <a onClick={handleLogout} href="/">Logout</a>,
        },
      ]
      : [
        {
          key: '10',
          icon: <LoginOutlined />,
          label: <Link to="/login">Login</Link>,
        },
        {
          key: '11',
          icon: <UserOutlined />,
          label: <Link to="/signup">Signup</Link>,
        },
      ]
    ),
  ];

  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setMobileDrawerVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', overflow: 'hidden' }}>
      {/* Sidebar for desktop */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={256}
          style={{
            position: 'fixed',
            height: '100vh',
            left: 0,
            top: 0,
            overflow: 'auto',
            zIndex: 1000,
          }}
        >
          <div className="logo" style={{ padding: '20px', textAlign: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              StackPop
            </Link>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Sider>
      )}

      {/* Drawer for mobile */}
      {isMobile && (
        <Drawer
          title="Menu"
          placement="left"
          closable={true}
          onClose={toggleMobileDrawer}
          visible={mobileDrawerVisible}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={menuItems}
          />
        </Drawer>
      )}

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 256), marginTop: 0 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'fixed',
            width: '100%',
            zIndex: 1,
            height: '64px', // Ensure consistent height
          }}
        >
          <Button
            type="text"
            icon={isMobile ? <MenuFoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={isMobile ? toggleMobileDrawer : () => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              position: 'absolute',
              left: '16px',
              top: 0,
              transition: 'left 0.3s',
            }}
          />
        </Header>

        <Content
          style={{
            marginTop: '64px', // Align content under header
            padding: '24px',
            background: colorBgContainer,
            overflow: 'auto',
            minHeight: 'calc(100vh - 64px)', // Ensure full height minus header
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<PrivateRoute component={JobDetail} />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/internships/:id" element={<PrivateRoute component={InternshipDetail} />} />
            <Route path="/profile" element={<PrivateRoute component={Profile} />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/applications/:jobId" element={<PrivateRoute component={ApplicationsPage} />} />
            <Route path="/student-dashboard" element={<PrivateRoute component={StudentDashboard} />} />
            <Route path="/create-job" element={<PrivateRoute component={CreateJob} />} />
            <Route path="/edit-job/:id" element={<PrivateRoute component={EditJob} />} />
            <Route path="/create-internship" element={<PrivateRoute component={CreateInternship} />} />
            <Route path="/edit-internship/:id" element={<PrivateRoute component={EditTpoInternshipPage} />} />
            <Route path="/tpo-dashboard" element={<PrivateRoute component={TpoDashboard} />} />
            <Route path="/tpo-jobs" element={<PrivateRoute component={AllTpoJobs} />} />
            <Route path="/create-tpo-job" element={<PrivateRoute component={PostTpoJob} />} />
            <Route path="/edit-tpo-job/:id" element={<PrivateRoute component={EditTpoJobPage} />} />
            <Route path="/tpo-jobs/:id" element={<PrivateRoute component={TpoJobDetail} />} />
            <Route path="/tpo-internships" element={<PrivateRoute component={TpoInternshipsPage} />} />
            <Route path="/tpo-internships/:id" element={<PrivateRoute component={TpoInternshipDetail} />} />
            <Route path="/tpo-events" element={<PrivateRoute component={TpoEventsPage} />} />
            <Route path="/tpo-events/:id" element={<PrivateRoute component={TpoEventDetail} />} />
            <Route path="/create-tpo-event" element={<PrivateRoute component={CreateTpoEvent} />} />
            <Route path="/edit-tpo-event/:id" element={<PrivateRoute component={EditTpoEventPage} />} />
            <Route path="/tpo-applications/:id" element={<PrivateRoute component={TpoApplicationsPage} />} />
            <Route path="/student/:studentId" element={<PrivateRoute component={StudentProfile} />} />


            <Route path="/chat" element={<PrivateRoute component={Chat} />} />


          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
