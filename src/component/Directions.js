import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, animateToRegion,  } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/destinations';
import { GOOGLE_MAPS_APIKEY } from '../constants';

const { width, height } = Dimensions.get('window');

class Directions extends Component {

    render() { 
            const { destinations } = this.props ;
            const firstDestination = destinations.length == 0 ? {
                latitude: 0, longitude: 0, latitudeDelta: 0.1,longitudeDelta: 0,} : destinations[0];
            const region = {
                latitude: firstDestination.latitude,
                longitude: firstDestination.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0,
            };

            return (
                <Modal
                        transparent={true}
                        visible={this.props.routeModalVisible}
                    >
                        <MapView
                            //ref={mapRef}
                            ref = {(ref)=> {this.mapView=ref;}}
                            provider ={PROVIDER_GOOGLE}
                            style = {{...StyleSheet.absoluteFillObject}}
                            region = {region}
                            showUserLocation={true}
                            //onRegionChange = {this.onRegionChange}
                        >  
                            {destinations.map((des) => <Marker key={des.id} coordinate={des}/>)}  

                            <MapViewDirections
                                origin={destinations[0]}
                                destination={destinations[destinations.length - 1]}
                                apikey={ GOOGLE_MAPS_APIKEY }
                                strokeWidth = {3}
                                strokeColor = "hotpink"
                                splitWaypoints ={true}
                                waypoints={ (destinations.length >= 2) ? destinations.slice(1, -1): null}
                                onStart={(params) => {
                                    //console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                                }}
                                onReady={result => {

                                    this.mapView.fitToCoordinates(result.coordinates, {
                                      edgePadding: {
                                        right: (width / 5),
                                        bottom: (height / 5),
                                        left: (width / 5),
                                        top: (height / 5),
                                      }
                                    });
                                }}
                                onError={(errorMessage) => {
                                    // console.log('GOT AN ERROR');
                                }}
                            />
                        </MapView>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                onPress = {()=>this.props.setRouteModalVisible(false)}
                                style={styles.button}>
                                    <Text style ={styles.text}>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                </Modal>
            );
        }
    
}
function mapStateToProps(state){
    const { destinations, routeModalVisible } = state.destinations;
    const { currentLocation } = state.currentLocation;
    return {
        routeModalVisible,
        currentLocation,
        destinations
    }
  }

function mapDispatchToProsp(dispatch){
    return {
      setRouteModalVisible: bindActionCreators(actionCreators.setRouteModalVisible, dispatch),
    }
}
 
export default connect (mapStateToProps, mapDispatchToProsp)(Directions);

const styles = StyleSheet.create({
    myLocationIconBackground: {
      position: 'absolute',
      bottom: 395,
      right : 15,
      backgroundColor: 'darkslateblue',
      padding:20,
      paddingTop: 16,
      borderRadius: 16,
      opacity: 0.5,
      borderWidth : 1
    },
    myLocationIconContainer : {
        position: 'absolute',
        bottom: 399,
        right : 21,
    },
    buttonContainer :{
        flexDirection : 'row',
        position: 'absolute',
        bottom: 0, 
        backgroundColor : '#fff',
        height: 90,
        width : '100%',
        padding:15,
        paddingRight: 30,
        paddingLeft: 30,
    },
    button :{
        flex : 1,
        backgroundColor: '#ddd',
        margin:7,
        borderRadius : 30,
        justifyContent:'center',
        alignItems : 'center'
    },
    text : {
        fontSize : 18
    }
  });