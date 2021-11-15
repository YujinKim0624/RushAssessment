import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import SwipableList from './SwipableList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Directions from './Directions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/destinations';

class Destinations extends Component {

    validateDestination(){
      if(this.props.destinations.length < 2)
        Alert.alert('Please add minimum 2 destinations');
      else {
        this.props.setRouteModalVisible(true);
      }
    }

    render() { 
        return (
        <View style ={styles.container}>
            <View style ={styles.header}>
                <View style ={styles.left}>
                    <Text style ={styles.title}>Destinations</Text>
                </View>
                <View style ={styles.right}>
                    <TouchableOpacity 
                        style ={styles.destinationButton}
                        onPress = {() =>this.validateDestination()}
                      >
                        <Icon name="directions" size={20} color={"#fff"}/>
                        <Text style ={styles.rightText}>DIRECTIONS</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style ={styles.list}>
                <SwipableList />
            </View>
            <Directions/>
        </View>
        );
    }
}

function mapStateToProps(state){
  const { routeModalVisible, destinations } = state.destinations;
  return {
      routeModalVisible,
      destinations
  }
}

function mapDispatchToProsp(dispatch){
  return {
    setRouteModalVisible: bindActionCreators(actionCreators.setRouteModalVisible, dispatch),
  }
}


export default connect (mapStateToProps, mapDispatchToProsp)(Destinations);


const styles = StyleSheet.create({
    container : {
        flex : 1,
      },
    header : {
      flex :1,
      flexDirection : "row",
      Height : 30
    }, 
    title : {
      fontSize : 30,
      fontWeight : '500',
      marginLeft: 15
    },
    left : {
      justifyContent: 'center',
      width: '67%',
    },
    right : {
      flexDirection : "row",
      justifyContent: 'center',
      alignItems :'center',
      //width: '30%',
    },
    destinationButton : {
      flexDirection : "row",
      alignItems :'center',
      backgroundColor : "darkslateblue",
      padding :5,
      borderRadius: 5,
    },
    rightText : {
      color: "#fff",
      fontWeight : '500',
    },
    list : {
      flex :6,
    },
    icon : {
      marginRight: 5,
    },
  
  });
