import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import $ from 'jquery'
import { findDOMNode } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { typography } from '@material-ui/core/styles';
import { WSAEMSGSIZE } from 'constants';

var markerParking = require('./parkingIcon.png');

class GoogleMapsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showingInfoWindow: false,
            markers: [],
            activeMarker: {},
            originalMarker: {},
            activeMarkerAddress: null,
            selectedPlace: {},
            centerPlace: {
                lat: null,
                lng: null
            }

        }
        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);
    }

    initGeolocation = () => {
        if (navigator.geolocation) {
            // Call getCurrentPosition with success and failure callbacks
            navigator.geolocation.getCurrentPosition(this.success, this.fail);
        }
        else {
            alert("Sorry, your browser does not support geolocation services.");
        }
    };

    success = (position) => {

        this.setState({
            centerPlace: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        });
    }

    fail = () => {
        console.log("Could not obtain location");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevProps", prevProps);
        console.log("props", this.props);

        if (this.props.defaultCenter || prevProps.defaultCenter) {

            if (this.props.defaultCenter != prevProps.defaultCenter) {
                this.setState({
                    centerPlace: {
                        lat: this.props.defaultCenter.lat,
                        lng: this.props.defaultCenter.lng
                    }
                });
            }

            //this.render();
        }
    }

    componentDidMount() {
        const that = this;
        const apiCallback = "egtcwaa.nz@gmail.com";
        const key = "a696bdc10c64454ebb5c141bc5eeda40";

        if (that.props.defaultCenter) {
            console.log("componentDidMount", that.props.defaultCenter);

            that.setState({
                centerPlace: {
                    lat: that.props.defaultCenter.lat,
                    lng: that.props.defaultCenter.lng
                }
            });

            that.render();
        }
        else {
            that.initGeolocation();
        }

        $.ajax({
            url: "https://data-atgis.opendata.arcgis.com/datasets/85f5330297974b76b06a130418c5397d_1.geojson",
            type: "GET"
        })
            .done(function (data) {
                let parkingLocationArr = [];

                data.features.forEach((element)=>{
                    if(element.properties.DATATYPE != "Disabled Parking"){
                        parkingLocationArr.push(element);
                        
                    }
                });
                that.setState({ markers: parkingLocationArr })
                console.log("that.state.markers",that.state.markers);

            })
            .fail(function () {
                console.log("NZTA API connection failed!");
            });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props.marker);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            originalMarker: props.marker,
            showingInfoWindow: true,
            activeMarkerAddress: props.address
        });
    }
    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }

    render() {
        const that = this;

        const style = {
            width: '100%',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }

        console.log("map render state", that.state.markers);

        return (
            <Map
                item
                xs={12}
                style={style}
                google={that.props.google}
                onClick={that.onMapClick}
                zoom={14}
                center={
                    {
                        lat: that.state.centerPlace.lat,
                        lng: that.state.centerPlace.lng
                    }
                }
            >
                <Marker
                    onClick={that.onMarkerClick}
                    title="You are here"
                    position={{ lat: that.state.centerPlace.lat, lng: that.state.centerPlace.lng }}
                    name="You are here"
                    marker={{ }}
                />

                {that.state.markers.map(marker => (
                    <Marker
                        key={marker.properties.OBJECTID}
                        onClick={that.onMarkerClick}
                        // title={marker.name}
                        position={{ lat: marker.geometry.coordinates[1], lng: marker.geometry.coordinates[0] }}
                        name={`TOTAL SPACES: ${marker.properties.TOTALSPACES}`}
                        address={`${marker.properties.STREETNUMBER} ${marker.properties.LONGDESCRIPTION} ( ${marker.properties.DATATYPE} )`}
                        marker={marker}
                        icon={{ url: markerParking, scaledSize: new that.props.google.maps.Size(50, 50) }}
                    />
                ))}


                <InfoWindow
                    marker={that.state.activeMarker}
                    visible={that.state.showingInfoWindow && that.state.activeMarker.name != "You are here"}
                >
                    <Paper>
                        <Typography
                            variant='headline'
                            // component='h4'
                        >
                        <div>
                            <image src={markerParking} height="20" width="20" />
                            <font size="4">{this.state.originalMarker.properties && this.state.originalMarker.properties.SHORTDESCRIPTION}</font>
                        </div>
                        </Typography>
                        <Typography
                            component='p'
                        >
                            <p>{this.state.originalMarker.properties && (this.state.originalMarker.properties.STREETNUMBER+" "+this.state.originalMarker.properties.STREET + " " + this.state.originalMarker.properties.SUBURB + " " + this.state.originalMarker.properties.CITY)}</p>
                            <p>{this.state.originalMarker.properties && this.state.originalMarker.properties.LONGDESCRIPTION}</p>
                            <p>{this.state.originalMarker.properties && ("Parking Type: " + this.state.originalMarker.properties.DATATYPE)}</p>
                            <p>{this.state.originalMarker.properties && ("Total Space: " + this.state.originalMarker.properties.TOTALSPACES)}</p>
                            
                        </Typography>
                    </Paper>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAUpjcevL9Lyf9lK_pawwbvz_PLj3-1hrg"
})(GoogleMapsContainer)
