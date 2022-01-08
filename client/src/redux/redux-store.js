import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './authReducer'
import {profileReducer} from "./profileReducer";
import {collectionReducer} from "./collectionsReducer";

const reducers = combineReducers(
  {
    auth: authReducer,
    profile: profileReducer,
    collection: collectionReducer,
  }
)
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.storeState = store
