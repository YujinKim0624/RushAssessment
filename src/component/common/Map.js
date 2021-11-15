import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class Map extends React.Component {

    render() { 
        return (
            <MapView
                provider ={PROVIDER_GOOGLE}
                style = {{...StyleSheet.absoluteFillObject}}
                region = {this.props.region}
                showUserLocation={true}>
            </MapView>
        );
    }
}

export default Map;