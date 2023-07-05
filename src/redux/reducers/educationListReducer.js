import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState';


export default function educationListReducer(state = initialState.educationList, action) {
    switch (action.type) {
        case actionTypes.GET_EDUCATIONS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}