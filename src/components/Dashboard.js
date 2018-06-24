import React from 'react';
import async from '../async'
import { Divider } from 'antd';


let DashboardCards = async(() => import("./DashboardCards"));
let DashboardChart = async(() => import("./DashboardChart"));

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <Divider />
                <div>
                    <DashboardCards />
                </div>
                <Divider />
                <div>
                    <DashboardChart />
                </div>
            </div>

        )
    }
}

export default Dashboard