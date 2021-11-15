import { ADD_DESTINATION, DELETE_DESTINATION, SET_ROUTE_MODAL_VISIBLE } from '../constants';
import moment from "moment";

const addDestination = (data, details) => {
    var date = moment()
      .utcOffset('+12:00')
      .format('YYYY-MM-DD hh:mm:ss');
    
    const obj = { 
        id: data.place_id,
        latitude: details.geometry.location.lat, 
        longitude: details.geometry.location.lng, 
        address1: data.structured_formatting.main_text,
        address2: data.structured_formatting.secondary_text,
        createdOn: date
    }

    return {
        type: ADD_DESTINATION,
        obj
    }
}

const deleteDestination = (data) => {
    return {
        type: DELETE_DESTINATION,
        data
    }
}

const setRouteModalVisible = (data) => {
    return {
        type: SET_ROUTE_MODAL_VISIBLE,
        data
    }
}

//Export Action Creators
export const actionCreators = {
    addDestination,
    deleteDestination,
    setRouteModalVisible
}