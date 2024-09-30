import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Spin, Result, Button, Typography, Divider, Row, Col, Tag, Card, message } from 'antd';
import { LoadingOutlined, ShareAltOutlined, WhatsAppOutlined, MailOutlined } from '@ant-design/icons';
import { applyForTpoJob, fetchTpoJobById } from '../redux/tpo/tpoJobs/tpoJobsSlice';

const { Title, Text } = Typography;

const TpoJobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select relevant state from Redux store
  const { job, loadingJobDetail, applyingForJob, error } = useSelector((state) => state.tpoJobs);

  useEffect(() => {
    dispatch(fetchTpoJobById(id));
  }, [dispatch, id]);

  // Handle job application
  const handleApply = async () => {
    try {
      await dispatch(applyForTpoJob(id)).unwrap();
      message.success('You have successfully applied for this job!');
    } catch (err) {
      message.error(err || 'Failed to apply for the job');
    }
  };

  // Loading spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loadingJobDetail) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  // Share handling functions
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this job: ${job?.title}`,
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      message.warning('Your browser does not support Web Share API. Use the buttons below to share manually.');
    }
  };

  const shareViaWhatsApp = () => {
    const messageText = `Check out this job: ${job?.title}\n\n${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card
        style={{ borderRadius: '10px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}
        bodyStyle={{ padding: '20px' }}
      >
        <Title level={1} style={{ marginBottom: '16px', fontSize: '36px', fontWeight: 'bold' }}>
          {job?.title}
        </Title>
        <Text style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>{job?.description}</Text>

        <Divider style={{ margin: '24px 0' }} />
        <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Applications: <Text type="secondary">{job?.applications?.length || 0}</Text>
        </Text>

        <Divider style={{ margin: '24px 0' }} />

        <Title level={3} style={{ marginBottom: '16px', color: '#333' }}>Job Criteria</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Skills:</Text>
            <Tag color="blue">{job?.criteria?.skills?.join(', ') || 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Minimum Experience:</Text>
            <Tag color="green">{job?.criteria?.minExperience || 'Any'} years</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Education:</Text>
            <Tag color="orange">{job?.criteria?.education || 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Location:</Text>
            <Tag color="purple">{job?.criteria?.location || 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Area:</Text>
            <Tag color="purple">{job?.criteria?.area || 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>College:</Text>
            <Tag color="magenta">{Array.isArray(job?.criteria?.college) ? job.criteria.college.join(', ') : job?.criteria?.college || 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Date of Birth:</Text>
            <Tag color="cyan">{job?.criteria?.dateOfBirth ? new Date(job.criteria.dateOfBirth).toLocaleDateString() : 'Any'}</Tag>
          </Col>
          <Col xs={24} sm={12}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>Academic Percentage:</Text>
            <Tag color="red">{job?.criteria?.academicPercentage || 'Any'}%</Tag>
          </Col>
        </Row>

        <Divider style={{ margin: '40px 0' }} />
        <Button
          type="primary"
          size="large"
          style={{ borderRadius: '5px', backgroundColor: '#1890ff', borderColor: '#1890ff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
          onClick={handleApply}
          loading={applyingForJob}
        >
          {applyingForJob ? 'Applying...' : 'Apply Now'}
        </Button>

        {/* Stylish Share Buttons Section */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
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
            href={`mailto:?subject=Check out this job&body=${encodeURIComponent(
              `Check out this job: ${job?.title}\n\n${window.location.href}`
            )}`}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </div>
      </Card>
    </div>
  );
};

export default TpoJobDetail;
