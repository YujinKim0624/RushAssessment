import { SET_CURRENTLOCATION, SET_MODAL_VISIBLE } from '../constants';
const initialState = {
    currentLocation : {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.1,
        longitudeDelta: 0,
    },
    myLocationModalVisible : false,
};
const currentLocation = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENTLOCATION:
                return {
                    ...state,
                    currentLocation : {
                        ...state.currentLocation,
                        latitude : action.data.latitude,
                        longitude : action.data.longitude,
                    },
                    myLocationModalVisible : false
                };
        case SET_MODAL_VISIBLE:
                return {
                    ...state,
                    myLocationModalVisible : action.data,
                };
        default:
            return state;
    }
}


//Export Reducer
export default currentLocation;