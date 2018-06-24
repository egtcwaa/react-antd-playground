import { Card, Col, Row, Icon } from 'antd';
import React from 'react';
import '../css/DashboardCard.css';

const CardTitle = () => {
    return (
        <div >
            <Row>
                <Col span={15}>
                    <Icon type="wechat" style={{ fontSize: 80, color: '#FFFFFF' }} />
                </Col>
                <Col span={9}>
                    <Row>
                        <Col offset={15}>
                            <font size="6" color="#FFFFFF">11</font>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <font size="3" color="#FFFFFF">New Comments!</font>
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
                <font color="#0074c2">View Detail</font>
                </Col>
                <Col span={2}>
                    <Icon type="right-circle" style={{color:'#0074c2'}} />
                </Col>
            </Row>
        </div>
    );
};

const MessageCard = () => {
    return (
        <Card id="MessageCardTitle" title={<CardTitle />} bordered={false} style={{ background: "rgb(245, 245, 245)" }}>{<CardContent />}</Card>
    );
};

export default MessageCard;