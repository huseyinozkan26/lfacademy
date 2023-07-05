import {combineReducers} from 'redux'
import categoryListReducer from './categoryListReducer';
import changeCategoryReducer from './changeCategoryReducer'
import educationListReducer from './educationListReducer';
import saveScormReducer from './saveScormReducer';


const rootReducer = combineReducers({
    changeCategoryReducer,
    categoryListReducer,
    educationListReducer,
    saveScormReducer
})

export default rootReducer;