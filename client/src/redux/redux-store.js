import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './authReducer'
import {profileReducer} from "./profileReducer";
import {collectionReducer} from "./collectionsReducer";
import {homeReducer} from "./homeReducer";

const reducers = combineReducers(
  {
    auth: authReducer,
    profile: profileReducer,
    collection: collectionReducer,
    home: homeReducer,
  }
)
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.storeState = store
