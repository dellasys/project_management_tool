import { combineReducers } from 'redux';
import projects from './Reducer';

const rootReducer = combineReducers({
    projects,
});

export default rootReducer;
