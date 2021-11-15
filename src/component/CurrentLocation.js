import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Alert} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, animateToRegion } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/currentLocation';
import { actionCreators as actionCreatorsDestinations} from '../actions/destinations';

class CurrentLocation extends React.Component {

    render() { 
        const { myLocationModalVisible, currentLocation } = this.props;
        console.log(currentLocation);
        return (
            <View>
                <View style={styles.myLocationIconBackground}/>
                <TouchableOpacity 
                    onPress = {()=>this.props.setModalVisible(true)}
                    style={styles.myLocationIconContainer}>
                    <Icon name="my-location" size={30} color={"#fff"}/>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={myLocationModalVisible}
                >
                    <MapView
                        ref = {(ref)=> {this.mapView=ref;}}
                        provider ={PROVIDER_GOOGLE}
                        style = {{...StyleSheet.absoluteFillObject}}
                        region = {currentLocation}
                        showUserLocation={true}
                        onRegionChange = {this.onRegionChange}
                    >
                        <Marker coordinate={currentLocation}/>
                        
                    </MapView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            onPress = {()=>this.props.setModalVisible(false)}
                            style={styles.button}>
                                <Text style ={styles.text}>CANCEL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {()=>this.props.setModalVisible(false)}
                            style={styles.button}>
                                <Text style ={styles.text}>CONFIRM</Text>
                        </TouchableOpacity>
                    </View>
            </Modal>
            </View>
        );
    }
}

function mapStateToProps(state){
    const { currentLocation, myLocationModalVisible } = state.currentLocation;
    return {
      currentLocation,
      myLocationModalVisible,
    }
  }

function mapDispatchToProsp(dispatch){
    return {
      setModalVisible: bindActionCreators(actionCreators.setModalVisible, dispatch),
      setCurrentLocation: bindActionCreators(actionCreators.setCurrentLocation, dispatch),
      addDestination: bindActionCreators(actionCreatorsDestinations.addDestination, dispatch),
    }
}
 
export default connect (mapStateToProps, mapDispatchToProsp)(CurrentLocation);


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
  
  
  