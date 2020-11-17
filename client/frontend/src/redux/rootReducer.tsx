import { combineReducers } from 'redux';
import currentUser from './loginReducer';


const rootReducer = combineReducers({
    currentUser
});

export default rootReducer;