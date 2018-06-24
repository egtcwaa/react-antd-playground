import { Card, Col, Row, Icon } from 'antd';
import React from 'react';
import '../css/DashboardCard.css';

const CardTitle = () => {
    return (
        <div >
            <Row>
                <Col span={15}>
                    <Icon type="shopping-cart" style={{ fontSize: 80, color: '#FFFFFF' }} />
                </Col>
                <Col span={9}>
                    <Row>
                        <Col offset={15}>
                            <font size="6" color="#FFFFFF">99</font>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={6}>
                            <font size="3" color="#FFFFFF">New Orders!</font>
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
                <font color="#F0AD4E">View Detail</font>
                </Col>
                <Col span={2}>
                    <Icon type="right-circle" style={{color:'rgb(240, 173, 78)'}} />
                </Col>
            </Row>
        </div>
    );
};

const ShoppingCard = () => {
    return (
        <Card id="ShoppingCardTitle" title={<CardTitle />} bordered={false} style={{ background: "rgb(245, 245, 245)" }}>{<CardContent />}</Card>
    );
};

export default ShoppingCard;