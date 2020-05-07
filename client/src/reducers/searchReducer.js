import {
    SEARCH_ITEM, FETCH_ITEMS
} from '../actions/types';

const initialState = {
    text: '',
    searchitems: [],
    loading: false,
    item: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_ITEM:
            return {
                ...state,
                text: action.payload,
                loading: false
            };

        case FETCH_ITEMS:
            return {
                ...state,
                searchitems: action.payload,
                loading: false
            };

        default:
            return state;
    }
}