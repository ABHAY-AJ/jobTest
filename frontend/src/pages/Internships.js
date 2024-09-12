// // src/pages/Internships.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setInternships } from '../redux/applicationSlice';
// import { fetchInternships } from '../services/api';
// import { Container, Row, Col } from 'react-bootstrap';
// import InternshipCard from '../components/InternshipCard';

// const Internships = () => {
//   const dispatch = useDispatch();
//   const internships = useSelector((state) => state.application.internships);

//   useEffect(() => {
//     const getInternships = async () => {
//       const response = await fetchInternships();
//       dispatch(setInternships(response.data));
//     };
//     getInternships();
//   }, [dispatch]);

//   return (
//     <Container>
//       <h1 className="my-4">Available Internships</h1>
//       <Row>
//         {internships.map((internship) => (
//           <Col md={4} key={internship._id}>
//             <InternshipCard internship={internship} />
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Internships;
