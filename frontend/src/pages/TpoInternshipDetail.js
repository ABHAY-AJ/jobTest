import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin, Result, Button, Typography, Divider, Row, Col, Tag, Card, message } from 'antd';
import { LoadingOutlined, ShareAltOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { applyForTpoInternship, fetchTpoInternshipById } from '../redux/tpo/tpoInternship/tpoInternshipSlice';

const { Title, Text } = Typography;

const TpoInternshipDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select relevant state from Redux store
  const { internship, loadingInternshipDetail, applyingForInternship, error } = useSelector((state) => state.tpoInternships);

  useEffect(() => {
    dispatch(fetchTpoInternshipById(id));
  }, [dispatch, id]);

  // Handle internship application
  const handleApply = async () => {
    try {
      await dispatch(applyForTpoInternship(id)).unwrap();
      message.success('You have successfully applied for this internship!');
    } catch (err) {
      message.error(err || 'Failed to apply for the internship');
    }
  };

  // Loading spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loadingInternshipDetail) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  // Share handling functions
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
      message.warning('Your browser does not support Web Share API. Use the buttons below to share manually.');
    }
  };

  const shareViaWhatsApp = () => {
    const messageText = `Check out this internship: ${internship?.title}\n\n${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

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
        <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Applications: <Text type="secondary">{internship?.tpoApplications?.length || 0}</Text>
        </Text>

        <Divider style={{ margin: '24px 0' }} />

        <Title level={3} style={{ marginBottom: '16px', color: '#333' }}>Internship Criteria</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Skills:</Text>
            <Tag color="blue">{internship?.criteria?.skills?.join(', ') || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Minimum Experience:</Text>
            <Tag color="green">{internship?.criteria?.minExperience || 'Any'} years</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Education:</Text>
            <Tag color="orange">{internship?.criteria?.education || 'Any'}</Tag>
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
            <Tag color="magenta">{Array.isArray(internship?.criteria?.College) ? internship.criteria.College.join(', ') : internship?.criteria?.College || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Date of Birth:</Text>
            <Tag color="cyan">{internship?.criteria?.dateOfBirth ? new Date(internship.criteria.dateOfBirth).toLocaleDateString() : 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Academic Percentage:</Text>
            <Tag color="red">{internship?.criteria?.academicPercentage || 'Any'}%</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>CGP:</Text>
            <Tag color="geekblue">{internship?.criteria?.cgp || 'Any'}</Tag>
          </Col>
          <Col span={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Duration:</Text>
            <Tag color="orange">{internship?.duration || 'Any'}</Tag>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0' }} />
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: '5px', backgroundColor: '#1890ff', borderColor: '#1890ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          onClick={handleApply}
          loading={applyingForInternship}
        >
          {applyingForInternship ? 'Applying...' : 'Apply Now'}
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

export default TpoInternshipDetail;
