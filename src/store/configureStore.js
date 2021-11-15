import { createStore, combineReducers } from 'redux';

import destinations from '../reducers/destinations';
import currentLocation from '../reducers/currentLocation';

const rootReducer = combineReducers({   
    destinations,
    currentLocation,
});
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;