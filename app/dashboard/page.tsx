'use client'

import React, { useState } from "react"

import { Col, Row, Form, Input, DatePicker, Select, Button, Modal } from 'antd';
import Test from "../tests";
import moment from 'moment';

const { Option } = Select;
export type taskType = {
    id: number
    title: string
    description: string
    date: string
    status: "COMPLETED" | "IN_PROGRESS" | "TODO"
    priority: "HIGH" | "MEDIUM" | "LOW"
}

const Dashboard = () => {
    const [tasks, setSetTasks] = useState<{
        todo: taskType[];
        in_progress: taskType[];
        completed: taskType[];
    }>({
        todo: [
            {
                id: 1,
                title: 'Brainstorming',
                date: "18/09/2024",
                description: "Brainstorming brings team members' diverse experience into play.",
                priority: "HIGH",
                status: "TODO"
            },
            {
                id: 2,
                title: 'Wireframes',
                date: "19/09/2024",
                description: "It just needs to adapt the UI from what you did before",
                priority: "HIGH",
                status: "COMPLETED"
            },
        ],
        completed: [
            {
                id: 201,
                title: 'Onboarding Illustrations',
                date: "18/10/2024",
                description: "",
                priority: "LOW",
                status: "IN_PROGRESS"
            },
        ],
        in_progress: [
            {
                id: 301,
                title: 'Design System',
                date: "12/10/2024",
                description: "It just needs to adapt the UI from what you did before",
                priority: "MEDIUM",
                status: "COMPLETED"
            },
        ]
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields(); // Reset form on cancel
    };

    const handleSubmit = (values: any) => {
        // console.log('Form values: ', values, moment(values.date).format('L'));
        form.resetFields();
        setSetTasks((prev) => {
            if (values.status === 'COMPLETED') {
                return {
                    ...prev, completed: [...prev.completed, {
                        id: prev.completed.length + 1,
                        date: moment(values.date).format('L'),
                        description: values.description,
                        priority: values.priority,
                        status: values.status,
                        title: values.title
                    }]
                }
            }
            if (values.status === 'IN_PROGRESS') {
                return {
                    ...prev, in_progress: [...prev.in_progress, {
                        id: prev.in_progress.length + 1,
                        date: moment(values.date).format('L'),
                        description: values.description,
                        priority: values.priority,
                        status: values.status,
                        title: values.title
                    }]
                }
            }
            return {
                ...prev, todo: [...prev.todo, {
                    id: prev.todo.length + 1,
                    date: moment(values.date).format('L'),
                    description: values.description,
                    priority: values.priority,
                    status: values.status,
                    title: values.title
                }]
            }
        })
        setIsModalVisible(false); // Close the modal after submit
    };


    return (
        <div>
            <div className="flex justify-between p-2 bg-green radius-4" >
                <h2>Desktop & Mobile Application</h2>
                <Button type="primary" onClick={showModal}>
                    Create Task
                </Button>
            </div>
            <div style={{ padding: '20px' }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <Test upperCardTitle="TODO" tasks={tasks.todo} color="#8A30E5" />
                    </Col>
                    <Col xs={24} sm={8}>
                        <Test upperCardTitle="IN PROGRESS" tasks={tasks.in_progress} color="#FFC14E" />
                    </Col>
                    <Col xs={24} sm={8}>
                        <Test upperCardTitle="COMPLETED" tasks={tasks.completed} color="#06C270" />
                    </Col>
                </Row>
            </div>
            <Modal
                title="Create New Task"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Disable default footer
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        date: moment(), // Set today's date as default
                    }}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please enter the task title!' }]}
                    >
                        <Input placeholder="Enter task title" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea placeholder="Add description here" rows={3} />
                    </Form.Item>
                    <Form.Item
                        label="Select Date"
                        name="date"
                        rules={[{ required: true, message: 'Please select a date!' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Select placeholder="Select status">
                            <Option value="TODO">To Do</Option>
                            <Option value="IN_PROGRESS">In Progress</Option>
                            <Option value="COMPLETED">Completed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Priority" name="priority">
                        <Select placeholder="Select priority">
                            <Option value="LOW">Low</Option>
                            <Option value="MEDIUM">Medium</Option>
                            <Option value="HIGH">High</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" onClick={handleCancel} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Dashboard;