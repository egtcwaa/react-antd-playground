import { Card, Col, Row, Icon } from 'antd';
import React from 'react';
import '../css/DashboardCard.css';

const CardTitle = () => {
    return (
        <div >
            <Row>
                <Col span={15}>
                    <Icon type="mail" style={{ fontSize: 80, color: '#FFFFFF' }} />
                </Col>
                <Col span={9}>
                    <Row>
                        <Col offset={15}>
                            <font size="6" color="#FFFFFF">22</font>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={6}>
                            <font size="3" color="#FFFFFF">New Mails!</font>
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
                <font color="#D9534F">View Detail</font>
                </Col>
                <Col span={2}>
                    <Icon type="right-circle" style={{color:'rgb(217, 83, 79)'}} />
                </Col>
            </Row>
        </div>
    );
};

const MailCard = () => {
    return (
        <Card id="MailCardTitle" title={<CardTitle />} bordered={false} style={{ background: "rgb(245, 245, 245)" }}>{<CardContent />}</Card>
    );
};

export default MailCard;