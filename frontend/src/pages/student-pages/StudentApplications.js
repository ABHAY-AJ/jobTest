import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentApplications } from '../../redux/student-Slice/studentSlice';
import { fetchJobById } from '../../redux/jobs-slices/jobSlice';
import { fetchInternshipById } from '../../redux/internship-slices/internshipSlice';
import { Card, List, Spin, Typography, Alert, Tag, Descriptions, Divider, Modal, Button } from 'antd';

const { Title } = Typography;

const statusColors = {
    Pending: 'orange',
    Reviewed: 'blue',
    Accepted: 'green',
    Rejected: 'red'
};

const StudentApplications = () => {
    const dispatch = useDispatch();
    const st = useSelector((state) => (state.applications));
    console.log("st", st)
    const { applications=[], loading, error } = useSelector((state) => state.student);
    const stu = useSelector((state) => state);
    const jobs = useSelector((state) => state.jobs.jobs);
    const internships = useSelector((state) => state.internships.internships);
    console.log("stu", stu)

    const [jobDetails, setJobDetails] = useState({});
    const [internshipDetails, setInternshipDetails] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null); // Tracks selected job for the modal
    const [selectedInternship, setSelectedInternship] = useState(null); // Tracks selected internship for the modal

    useEffect(() => {
        dispatch(fetchStudentApplications());
    }, [dispatch]);



    useEffect(() => {
        // Fetch details for each job and internship in applications
        applications.forEach((application) => {
            if (application.job) {
                dispatch(fetchJobById(application.job)).then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setJobDetails((prev) => ({
                            ...prev,
                            [application.job]: response.payload
                        }));
                    }
                });
            }
            if (application.internship) {
                dispatch(fetchInternshipById(application.internship)).then((response) => {
                    if (response.meta.requestStatus === 'fulfilled') {
                        setInternshipDetails((prev) => ({
                            ...prev,
                            [application.internship]: response.payload
                        }));
                    }
                });
            }
        });
    }, [applications, dispatch]);

    const showModal = (jobId, internshipId) => {
        if (jobId) {
            setSelectedJob(jobDetails[jobId]);
        } else if (internshipId) {
            setSelectedInternship(internshipDetails[internshipId]);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setSelectedJob(null);
        setSelectedInternship(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedJob(null);
        setSelectedInternship(null);
    };

    if (loading) return <Spin tip="Loading..." />;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Student Applications</Title>
            <Divider />
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={applications}
                renderItem={(application) => (
                    <List.Item key={application._id}>
                        <Card title={`Application ID: ${application._id}`}>
                            <Descriptions bordered column={1}>
                                <Descriptions.Item label="Application Status">
                                    <Tag color={statusColors[application.status]}>
                                        {application.status}
                                    </Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Score">
                                    {application.score}
                                </Descriptions.Item>

                                {application.job && jobDetails[application.job] && (
                                    <>
                                        <Descriptions.Item label="Job Title">
                                            {jobDetails[application.job].title}
                                            <Button type="link" onClick={() => showModal(application.job, null)}>View Details</Button>
                                        </Descriptions.Item>
                                    </>
                                )}

                                {application.internship && internshipDetails[application.internship] && (
                                    <>
                                        <Descriptions.Item label="Internship Title">
                                            {internshipDetails[application.internship].title}
                                            <Button type="link" onClick={() => showModal(null, application.internship)}>View Details</Button>
                                        </Descriptions.Item>
                                    </>
                                )}

                                <Descriptions.Item label="Date of Application">
                                    {new Date(application.date).toLocaleDateString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </List.Item>
                )}
            />

            {/* Modal for Job and Internship Details */}
            <Modal
                title={selectedJob ? 'Job Details' : 'Internship Details'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {selectedJob && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Title">{selectedJob.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedJob.description}</Descriptions.Item>
                        <Descriptions.Item label="Criteria">
                            {Object.entries(selectedJob.criteria).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {Array.isArray(value)
                                        ? value.join(', ')
                                        : value}
                                </div>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                )}

                {selectedInternship && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Title">{selectedInternship.title}</Descriptions.Item>
                        <Descriptions.Item label="Description">{selectedInternship.description}</Descriptions.Item>
                        <Descriptions.Item label="Criteria">
                            {Object.entries(selectedInternship.criteria).map(([key, value]) => (
                                <div key={key}>
                                    <strong>{key}:</strong> {Array.isArray(value)
                                        ? value.join(', ')
                                        : value}
                                </div>
                            ))}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default StudentApplications;