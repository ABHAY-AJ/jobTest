import { Layout, Card, List } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';

const { Content } = Layout;

const ApplicationStatus = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await axios.get('/api/student/applications');
            setApplications(response.data);
        };
        fetchApplications();
    }, []);

    return (
        <Layout>
            <Content className="p-6">
                <h1 className="text-2xl mb-4">Application Status</h1>
                <List
                    itemLayout="vertical"
                    dataSource={applications}
                    renderItem={application => (
                        <Card className="mb-4">
                            <h2>{application.jobTitle}</h2>
                            <p>{`Status: ${application.status}`}</p>
                            <p>{`Applied on: ${new Date(application.appliedDate).toLocaleDateString()}`}</p>
                        </Card>
                    )}
                />
            </Content>
        </Layout>
    );
};

export default ApplicationStatus;
