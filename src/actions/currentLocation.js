import { SET_CURRENTLOCATION, SET_MODAL_VISIBLE } from '../constants';

const setCurrentLocation = (data) => {
    console.log("setCurrentLocation")
    return {
        type: SET_CURRENTLOCATION,
        data
    }
}

const setModalVisible = (data) => {
    return {
        type: SET_MODAL_VISIBLE,
        data
    }
}

//Export Action Creators
export const actionCreators = {
    setCurrentLocation,
    setModalVisible,
}