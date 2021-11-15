import React from 'react';
import { StyleSheet, SafeAreaView, View, PermissionsAndroid, TouchableOpacity} from 'react-native';
import Map from './component/common/Map'
import Geolocation from "react-native-geolocation-service";
import Destinations from './component/Destinations';
import CurrentLocation from './component/CurrentLocation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './actions/currentLocation';
import Search from './component/Search'

class App extends React.Component {

  async componentDidMount() {
    if(Platform.OS === 'ios'){
         this.getCurrentLocation();
    }
    else{
         try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Device current location permission',
              message:
                'Allow app to get your current location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
       }
   }
   
   getCurrentLocation(){
      Geolocation.requestAuthorization('always').then((res) => {
        console.log(res);
      });

      Geolocation.getCurrentPosition(
        (position) => {
          console.log("position", position);
          this.props.setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log("map error: ",error);
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
       );
     }
     
  render() { 
    return (
      <SafeAreaView style ={styles.container}>
        <View style ={styles.mapContainer}>
          <Map />
          <Search /> 
        </View>
        <View style ={styles.destinationContainer}>
          <Destinations />
        </View> 
        <CurrentLocation />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state){
  const { currentLocation } = state.currentLocation;
  return {
    currentLocation
  }
}

function mapDispatchToProsp(dispatch){
  return {
    setCurrentLocation: bindActionCreators(actionCreators.setCurrentLocation, dispatch),
  }
}

export default connect (mapStateToProps, mapDispatchToProsp)(App);

const styles = StyleSheet.create({
  container : {
    flex : 1,
  },
  mapContainer : {
    flex :1,
  },
  destinationContainer : {
    flex :1,
  },
  icon : {
    marginRight: 5,
  },
});


