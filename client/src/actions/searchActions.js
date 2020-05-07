import axios from 'axios';
import { SEARCH_ITEM, FETCH_ITEMS } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import history from '../history';

export const searchItem = text => dispatch => {
    dispatch({
        type: SEARCH_ITEM,
        payload: text
    })
};

export const fetchItems = text => dispatch => {
    axios
        .get(`/api/items/${text}`)
        .then(res =>
            dispatch({
                type: FETCH_ITEMS,
                payload: res.data
            }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};