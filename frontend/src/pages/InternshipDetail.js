import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchInternshipById, applyForInternship } from '../redux/internship-slices/internshipSlice';
import { Card, Button, Spin, Result, Typography, notification, Row, Col, Tag, Divider } from 'antd';
import { LoadingOutlined, ShareAltOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const InternshipDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { internship, loading, error } = useSelector((state) => state.internships);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    dispatch(fetchInternshipById(id));
  }, [dispatch, id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await dispatch(applyForInternship(id)).unwrap();
      notification.success({
        message: 'Application Successful',
        description: 'You have successfully applied for this internship.',
      });
    } catch (err) {
      notification.error({
        message: 'Application Failed',
        description: err.message || 'Something went wrong. Please try again later.',
      });
    } finally {
      setApplying(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: internship?.title,
        text: `Check out this internship: ${internship?.title}`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      notification.warning({
        message: 'Share Not Supported',
        description: 'Your browser does not support Web Share API. Please use the buttons below to share manually.',
      });
    }
  };

  const shareViaWhatsApp = () => {
    const message = `Check out this internship: ${internship?.title}\n\n${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loading) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;
  if (!internship) return <Result status="404" title="No Internship Found" />;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        style={{ borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        bodyStyle={{ padding: '40px' }}
      >
        <Title level={1} style={{ marginBottom: '16px', fontSize: '36px', fontWeight: 'bold' }}>
          {internship?.title}
        </Title>
        <Text style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>{internship?.description}</Text>

        <Divider style={{ margin: '24px 0' }} />

        <Title level={3} style={{ marginBottom: '16px', color: '#333' }}>Internship Criteria</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Skills:</Text>
            <Tag color="blue">{internship?.criteria?.skills.join(', ') || 'N/A'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Minimum Experience:</Text>
            <Tag color="green">{internship?.criteria?.minExperience || 'N/A'} years</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Education:</Text>
            <Tag color="orange">{internship?.criteria?.education || 'N/A'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Location:</Text>
            <Tag color="purple">{internship?.criteria?.location || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Area:</Text>
            <Tag color="purple">{internship?.criteria?.area || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>College:</Text>
            <Tag color="magenta">{internship?.criteria?.College.join(', ') || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Date of Birth:</Text>
            <Tag color="cyan">{internship?.criteria?.dateOfBirth ? new Date(internship.criteria.dateOfBirth).toLocaleDateString() : 'N/A'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Academic Percentage:</Text>
            <Tag color="red">{internship?.criteria?.academicPercentage || 'N/A'}%</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Duration:</Text>
            <Tag color="gold">{internship?.duration || 'N/A'} months</Tag>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0' }} />

        {/* Apply Button */}
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: '5px',
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '20px',
          }}
          onClick={handleApply}
          loading={applying}
        >
          {applying ? 'Applying...' : 'Apply Now'}
        </Button>

        {/* Stylish Share Buttons Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <Button
            type="default"
            shape="circle"
            size="large"
            style={{
              color: '#1890ff',
              borderColor: '#1890ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            icon={<ShareAltOutlined style={{ fontSize: '20px' }} />}
            onClick={handleShare}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          <Button
            type="default"
            shape="circle"
            size="large"
            style={{
              color: '#25D366',
              borderColor: '#25D366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            icon={<WhatsAppOutlined style={{ fontSize: '20px' }} />}
            onClick={shareViaWhatsApp}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />

          <Button
            type="default"
            shape="circle"
            size="large"
            style={{
              color: '#0072c6',
              borderColor: '#0072c6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            icon={<MailOutlined style={{ fontSize: '20px' }} />}
            href={`mailto:?subject=Check out this internship&body=${encodeURIComponent(
              `Check out this internship: ${internship?.title}\n\n${window.location.href}`
            )}`}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      </Card>
    </div>
  );
};
export default InternshipDetail;