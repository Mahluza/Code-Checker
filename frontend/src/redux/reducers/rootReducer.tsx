import { combineReducers } from 'redux';
import currentUser from './loginReducer';
import getProjects from './projectsReducer'


const rootReducer = combineReducers({
    currentUser,
    getProjects
});

export default rootReducer;