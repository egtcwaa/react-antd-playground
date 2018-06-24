import { Col, Row } from 'antd';
import React from 'react';
import async from '../async'

let MessageCard = async(() => import("./MessageCard"));
let TaskCard = async(() => import("./TaskCard"));
let ShoppingCard = async(() => import("./ShoppingCard"));
let MailCard = async(() => import("./MailCard"));


class DashboardCards extends React.Component {
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={6}>
                        <MessageCard />
                    </Col>
                    <Col span={6}>
                        <TaskCard />
                    </Col>
                    <Col span={6}>
                        <ShoppingCard />
                    </Col>
                    <Col span={6}>
                        <MailCard />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DashboardCards
