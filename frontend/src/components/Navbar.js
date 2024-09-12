// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Layout, Menu, Button } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../redux/user-slices/authSlice';

// const { Header } = Layout;

// const Navigation = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.user.token);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/'); // Navigate to the home page after logout
//   };

//   return (
//     <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div className="logo">
//         <Link to="/" style={{ color: '#fff', fontSize: '20px' }}>Portal</Link>
//       </div>
//       <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flexGrow: 1 }}>
//         <Menu.Item key="1">
//           <Link to="/jobs">Jobs</Link>
//         </Menu.Item>
//         <Menu.Item key="2">
//           <Link to="/internships">Internships</Link>
//         </Menu.Item>
//         {isAuthenticated && (
//           <>
//             <Menu.Item key="3">
//               <Link to="/profile">Profile</Link>
//             </Menu.Item>
//             <Menu.Item key="4">
//               <Link to="/dashboard">Dashboard</Link>
//             </Menu.Item>
//           </>
//         )}
//       </Menu>
//       {isAuthenticated ? (
//         <Button type="danger" onClick={handleLogout}>Logout</Button>
//       ) : (
//         <>
//           <Button type="primary" onClick={() => navigate('/login')}>Login</Button>
//           <Button style={{ marginLeft: '10px' }} onClick={() => navigate('/signup')}>Sign Up</Button>
//         </>
//       )}
//     </Header>
//   );
// };

// export default Navigation;
