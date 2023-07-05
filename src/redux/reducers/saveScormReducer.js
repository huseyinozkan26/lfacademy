import * as actionTypes from '../actions/actionTypes'
import initialState from './initialState';


export default function saveScormReducer(state = initialState.savedScorm, action) {
    switch (action.type) {
        case actionTypes.CREATE_SCORM_SUCCESS || actionTypes.UPDATE_SCORM_SUCCESS:
            return action.payload
        default:
            return state;
    }
}