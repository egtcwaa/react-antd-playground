import { Card, Col, Row, Icon } from 'antd';
import React from 'react';
import '../css/DashboardCard.css';

const CardTitle = () => {
    return (
        <div >
            <Row>
                <Col span={15}>
                    <Icon type="database" style={{ fontSize: 80, color: '#FFFFFF' }} />
                </Col>
                <Col span={9}>
                    <Row>
                        <Col offset={15}>
                            <font size="6" color="#FFFFFF">12</font>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={8}>
                            <font size="3" color="#FFFFFF">New Tasks!</font>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    );
};

const CardContent = () => {
    return (
        <div>
            <Row>
                <Col span={22}>
                <font color="#5CB85C">View Detail</font>
                </Col>
                <Col span={2}>
                    <Icon type="right-circle" style={{color:'rgb(92, 184, 92)'}} />
                </Col>
            </Row>
        </div>
    );
};

const TaskCard = () => {
    return (
        <Card id="TaskCardTitle" title={<CardTitle />} bordered={false} style={{ background: "rgb(245, 245, 245)" }}>{<CardContent />}</Card>
    );
};

export default TaskCard;