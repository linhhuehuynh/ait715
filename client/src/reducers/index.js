import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import requestItemReducer from './requestItemReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    requestitem: requestItemReducer,
})