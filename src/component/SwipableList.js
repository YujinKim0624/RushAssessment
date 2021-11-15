import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/destinations';

class SwipableList extends Component {
    render() { 
        return (
            <View style = {styles.container}>
                <SwipeListView
                    data = {this.props.destinations}
                    renderItem={({ item }) => (
                        <View style = {styles.itemRow}>
                            <Text style = {styles.rowAddress1}> {item.address1}</Text>
                            <Text style = {styles.rowAddress2}> {item.address2}</Text>
                        </View>
                    )}
                    renderHiddenItem={ (data, rowMap) => (
                        <TouchableOpacity
                            onPress = { _ => this.props.deleteDestination(data.item.id)} 
                            style={styles.rowBack}>
                            <Icon name = {"horizontal-rule"} size={30}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor = {item => item.id.toString()}
                    leftOpenValue={60}
                />
            </View>
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
      deleteDestination: bindActionCreators(actionCreators.deleteDestination, dispatch),
    }
}
 
export default connect (mapStateToProps, mapDispatchToProsp)(SwipableList);


const styles = StyleSheet.create({
    container : {
        borderTopWidth : 1,
        borderColor : '#bbb',
    },
    itemRow : {
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth : 1,
        borderColor : '#bbb',
    },
    rowBack: {
        backgroundColor : "crimson",
        flex:1,
        flexdirection : 'row',
        paddingLeft: 15,
        justifyContent : 'center'

    },
    rowAddress1 :{
        fontSize : 25,
    },
    rowAddress2 :{
        color: "#555"
    }
});
 