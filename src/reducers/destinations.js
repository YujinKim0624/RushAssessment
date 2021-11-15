import { ADD_DESTINATION, DELETE_DESTINATION, SET_ROUTE_MODAL_VISIBLE } from '../constants';
const initialState = {
    destinations : [],
    routeModalVisible : false,
};
const destinations = (state = initialState, action) => {
    switch(action.type) {
        case ADD_DESTINATION:
            return {
                ...state,
                destinations : state.destinations.concat(action.obj)
            };
        case DELETE_DESTINATION : 
            return {
                ...state,
                destinations : state.destinations.filter(item => item.id !== action.data)
        };
        case SET_ROUTE_MODAL_VISIBLE:
                return {
                    ...state,
                    routeModalVisible :action.data
                };
        default:
            return state;
    }
}

//Export Reducer
export default destinations;