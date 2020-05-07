import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import requestItemReducer from './requestItemReducer';
import searchReducer from './searchReducer';

export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer,
    requestitem: requestItemReducer,
    searchitems: searchReducer
})