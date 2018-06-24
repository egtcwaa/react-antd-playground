import React from 'react';
import async from '../async'
import { Divider } from 'antd';
import { Col, Row } from 'antd';

let GoogleMap = async(() => import("./GoogleMap"));
let LocationSearchInput = async(() => import("./LocationSearchInput"));


class MapPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: null

        }
    }

    handleSelectedPlace = (address) => {

        if (address) {
            this.setState({
                selectedPlace: address
            });
        }

        this.render();
    }

    render() {
        const that = this;

        return (
            <div>
                <h1>NZTA Parking Location</h1>
                <Divider />

                <div>
                    <Row>
                        <Col span={6}>
                            Google Location Search Engine
                        </Col>
                        <Col span={15}>
                            <GoogleMap defaultCenter={that.state.selectedPlace} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <LocationSearchInput onSelectedPlace={this.handleSelectedPlace} />
                        </Col>
                    </Row>

                </div>
                <div>
                    <p>All parking information is provided by NZ Auckland Transport API.</p>
                </div>
            </div>

        )
    }
}

export default MapPage