import Reducer1 from './reducer1'
import AuthReducer from './auth_reducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    reducer1: Reducer1,
    authReducer: AuthReducer
})

export default rootReducer