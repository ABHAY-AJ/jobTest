import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchInternshipById } from '../redux/internship-slices/internshipSlice';
import { Card, Button, Spin, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Reset default Ant styles for cleaner look

const InternshipDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { internship, loading, error } = useSelector((state) => state.internships);
console.log(internship);
  useEffect(() => {
    dispatch(fetchInternshipById(id));
  }, [dispatch, id]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;
  if (!internship) return <Result status="404" title="No internship Found" />;

  return (
    <div style={{ padding: '20px' }}>
      <Card
        hoverable
        style={{
          width: '100%',
          transition: 'transform 0.3s',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          body: { padding: '20px' }, // Replacing `bodyStyle` with `style.body`
        }}
      >
        <Card.Meta title={internship.title} description={internship.description} />
        <Button type="primary" size="large" style={{ marginTop: '20px' }}>
          Apply Now
        </Button>
      </Card>
    </div>
  );
};

export default InternshipDetail;
