import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/destinations';
import { GOOGLE_PLACES_API_KEY } from '../constants';

class Search extends Component {

    renderRow = (item) => {
        return (
            <View style ={styles.rowContainer}>
              <View  style ={styles.addIcon}>
                <Icon name ="add-circle" size ={30} color={"#008b8b"}/>
              </View>
              <View>
                <Text style ={styles.rowMainText}>{item.structured_formatting.main_text}</Text> 
                <Text style ={styles.rowSecondaryText}>{item.structured_formatting.secondary_text}</Text> 
              </View>
            </View>
        )
    }

    onPress = (data, details) => {
        this.props.addDestination(data, details);
        this.GooglePlacesRef.setAddressText("");
    }

    render() { 
        return (
            <GooglePlacesAutocomplete
                ref={(instance) => { this.GooglePlacesRef = instance }}
                textInputProps={{
                    autoFocus: true,
                }}
                placeholder='Search here'
                onPress={(data, details = null) => { this.onPress(data, details)}}
                renderRow = {(item)=>this.renderRow(item)}
                fetchDetails ={true}
                GooglePlacesDetailsQuery = {{ fields:  'geometry'}}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                    components: 'country:nz',
                    types: 'geocode'
                }}
                styles={{
                    textInputContainer: {
                      backgroundColor: '#fff',
                      margin:10,
                      marginTop:30,
                      padding: 10,
                      opacity : 0.9
                    },
                    textInput: {
                      height: 38,
                      color: '#222',
                      fontSize: 17,
                      textAlign : 'center',
                    },
                    predefinedPlacesDescription: {
                      color: '#222',
                    },
                    poweredContainer : {
                        display : 'none'
                    },
                    row : {
                        padding : 5
                    }
                }}
            />
        );
    }
}


function mapStateToProps(state){
    const { destinations } = state.destinations;
    return {
        destinations,
    }
  }

function mapDispatchToProsp(dispatch){
    return {
        addDestination: bindActionCreators(actionCreators.addDestination, dispatch),
    
    }
}
 
export default connect (null,mapDispatchToProsp)(Search);

const styles = StyleSheet.create({
    rowContainer : {
        flexDirection : "row",
    },
    addIcon : {
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
    },
    rowMainText :{
        fontSize : 20,
    },
    rowSecondaryText :{
        color: "#555"
    }
  });