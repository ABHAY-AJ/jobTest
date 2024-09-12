import React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        hoverable
        style={{
          borderRadius: '10px',
          overflow: 'hidden',
          transition: 'transform 0.3s',
          body: { padding: '20px' }, // Correctly applying styles
        }}
      >
        <Card.Meta title={job.title} description={job.description} />
        
        {/* Wrap the Button with Link for proper routing */}
        <Link to={`/jobs/${job._id}`}>
          <Button type="primary" size="large" style={{ marginTop: '10px' }}>
            View Details
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
};

export default JobCard;
