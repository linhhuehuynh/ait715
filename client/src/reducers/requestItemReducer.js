import { GET_REQUESTITEMS, ADD_REQUESTITEM, REQUESTITEMS_LOADING } from '../actions/types';

const initialState = {
    requestitems: [],
    loading: false

};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_REQUESTITEMS:
            return {
                ...state,
                requestitems: action.payload,
                loading: false
            };

        case ADD_REQUESTITEM:
            return {
                ...state,
                requestitems: [action.payload, ...state.requestitems]
            };

        case REQUESTITEMS_LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}