import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './authReducer'
import {profileReducer} from "./profileReducer";
const reducers = combineReducers(
    {
        auth: authReducer,
        profile: profileReducer,
    }
)
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.storeState = store
