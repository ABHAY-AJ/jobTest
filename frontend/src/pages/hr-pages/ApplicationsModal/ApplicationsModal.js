// src/components/ApplicationsModal.js
import React from 'react';
import { Modal, Table, Button, Form, Select, message } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

const ApplicationsModal = ({
  isModalVisible,
  handleCloseModal,
  selectedTitle,
  selectedApplications,
  setSelectedApplicationId,
  selectedApplicationId,
  reviewForm,
  handleReviewStatusChange
}) => {
  return (
    <Modal
      title={`Applications for ${selectedTitle}`}
      visible={isModalVisible}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Table
        dataSource={selectedApplications}
        rowKey="_id"
        rowClassName="custom-hover-row"
        onRow={(record) => ({
          onClick: () => {
            setSelectedApplicationId(record._id);
            reviewForm.setFieldsValue({ status: record.status });
          },
        })}
      >
        <Table.Column
          title="Student Name"
          dataIndex={['student', 'name']}
          key="studentName"
          render={(name, record) => (
            <Button type="link">
              <Link to={`/student/${record.student._id}`}>{name}</Link>
            </Button>
          )}
        />
        <Table.Column title="Score" dataIndex="score" key="score" />
        <Table.Column title="Status" dataIndex="status" key="status" />
      </Table>

      {selectedApplicationId && (
        <Form form={reviewForm} layout="vertical" style={{ marginTop: '20px' }}>
          <Form.Item name="status" label="Review Status">
            <Select placeholder="Select a status">
              <Option value="Pending">Pending</Option>
              <Option value="Reviewed">Reviewed</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleReviewStatusChange}>
              Update Status
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ApplicationsModal;
