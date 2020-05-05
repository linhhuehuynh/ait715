import axios from 'axios';
import { GET_REQUESTITEMS, ADD_REQUESTITEM, REQUESTITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import history from '../history';

export const getRequestItems = () => dispatch => {
    dispatch(setRequestItemsLoading());
    axios
        .get('/api/requestitem')
        .then(res =>
            dispatch({
                type: GET_REQUESTITEMS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};



export const addRequestItem = requestitem => (dispatch, getState) => {
    axios
        .post('/api/requestitem', requestitem, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_REQUESTITEM,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    history.push('/');
};


export const setRequestItemsLoading = () => {
    return {
        type: REQUESTITEMS_LOADING
    }
}
