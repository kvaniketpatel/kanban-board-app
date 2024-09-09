import React from "react";
import { Card, Col, Row, Dropdown, Menu, Tag, Button, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { TaskType } from "./lib/definitions";


interface TestPropsModel {
    upperCardTitle: string
    tasks: TaskType[]
    color: string
}



const Test: React.FunctionComponent<TestPropsModel> = ({ upperCardTitle, tasks, color }) => {

    const getPriorityTag = (priority: string) => {
        if (priority === "HIGH") return <Tag color="red">High</Tag>;
        if (priority === "MEDIUM") return <Tag color="orange">Medium</Tag>;
        return <Tag color="green">Low</Tag>;
        // if (priority === "HIGH") return <Image
        //     src="/high.svg"
        //     width={100}
        //     height={100}
        //     alt="Screenshots of the dashboard project showing desktop version"
        // />;
        // if (priority === "MEDIUM") return <Image
        //     src="/medium.svg"
        //     width={100}
        //     height={100}
        //     alt="Screenshots of the dashboard project showing desktop version"
        // />;
        // return <Image
        //     src="/low.svg"
        //     width={100}
        //     height={100}
        //     alt="Screenshots of the dashboard project showing desktop version"
        // />;
    };


    const renderTaskCard = (task: TaskType) => {
        const menu = (
            <Menu onClick={(info) => handleMenuClick(info, task.id)}>
                <Menu.Item key="TODO">Todo</Menu.Item>
                <Menu.Item key="IN_PROGRESS">In Progress</Menu.Item>
                <Menu.Item key="COMPLETED">Completed</Menu.Item>
            </Menu>
        );

        return (
            <Card
                key={task.id}
                type="inner"
                title={
                    <div>
                        <span>{getPriorityTag(task.priority)}</span>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {task.title}
                            <Dropdown overlay={menu}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <DownOutlined />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                }
                style={{ marginTop: 16 }}
                // extra={<span>{getPriorityTag(task.priority)}</span>}
            >
                <p>{task.description}</p>
                <p>{task.date}</p>
            </Card>
        );
    };

    const handleMenuClick = ({ key }: { key: string }, taskId: number) => {
        // Add status change logic here
        console.log(`Task ID: ${taskId}, Status changed to: ${key}`);
    };

    return (
        <>
            <Card title={upperCardTitle} style={{background:color}}>
                {tasks.map(renderTaskCard)}
            </Card>
        </>
    )
}

export default Test