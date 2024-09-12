import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJobById, applyForJob, clearApplicationError } from '../redux/jobs-slices/jobSlice';
import { Card, Button, Spin, Result, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Select relevant state from Redux store
  const { job, loadingJobDetail, applyingForJob, applicationError, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobById(id));
  }, [dispatch, id]);

  // Clear application error when component mounts or job changes
  useEffect(() => {
    if (applicationError) {
      message.error(applicationError);
      dispatch(clearApplicationError());
    }
  }, [applicationError, dispatch]);

  // Handle job application
  const handleApply = async () => {
    try {
      await dispatch(applyForJob(id)).unwrap();
      message.success('You have successfully applied for this job!');
    } catch (err) {
      message.error(err || 'Failed to apply for the job');
    }
  };

  // Loading spinner
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  if (loadingJobDetail) return <Spin indicator={antIcon} />;
  if (error) return <Result status="error" title="Error" subTitle={error} />;

  return (
    <div style={{ padding: '20px' }}>
      <Card hoverable>
        <Card.Meta title={job?.title} description={job?.description} />
        <Button
          type="primary"
          size="large"
          style={{ marginTop: '20px' }}
          onClick={handleApply}
          loading={applyingForJob}
        >
          {applyingForJob ? 'Applying...' : 'Apply Now'}
        </Button>
      </Card>
    </div>
  );
};

export default JobDetail;
