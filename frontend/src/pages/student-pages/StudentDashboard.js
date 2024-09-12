import React from 'react';
import { Row, Col, Typography } from 'antd';
import AppliedJobsAndInternships from './AppliedJobsAndInternships';
import StudentApplications from './StudentApplications';

const { Title } = Typography;

const StudentDashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Title level={1}>Student Dashboard</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <AppliedJobsAndInternships />
                </Col>
                <Col span={12}>
                    <StudentApplications />
                </Col>
            </Row>
        </div>
    );
};

export default StudentDashboard;
