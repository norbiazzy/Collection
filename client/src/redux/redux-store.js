import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {authReducer} from './authReducer'
import {collectionReducer} from "./collectionsReducer2";
import {homeReducer} from "./homeReducer";
import {userReducer} from "./uersReducer";
import {itemsReducer} from "./ItemsReducer";
import {commonReducer} from "./commonReducer";
//
// const reducers = combineReducers(
//   {
//     auth: authReducer,
//     profile: profileReducer,
//     collection: collectionReducer,
//     home: homeReducer,
//   }
// )
// export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
// window.storeState = store

const reducers = combineReducers(
  {
    auth: authReducer,
    user: userReducer,
    collection: collectionReducer,
    item: itemsReducer,
    common: commonReducer,
    home: homeReducer
  }
)
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))
window.storeState = store
