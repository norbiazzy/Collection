import {bigCollectionsAPI, popularItemsAPI} from "../api/api";

const GET_COLLECTIONS = 'GET_COLLECTIONS'
const SET_CONTENT = 'SET_CONTENT'
const GET_ITEMS = 'GET_ITEMS'
// const SET_COLLECTION = 'SET_COLLECTION'

const initialState = {
  collections: [],
  contentType: 'collections'
}
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTIONS:
      return {
        ...state,
        collections: action.collections.collections
      }
    case SET_CONTENT:
      return {
        ...state,
        contentType: action.contentType
      }
    default:
      return state;
  }
}

export const getCollectionsThunk = () => (dispatch) => {
  return bigCollectionsAPI()
    .then(collections => {
      console.log(123)
      dispatch(getCollectionsAC(collections))
    })
}
export const getItemsThunk = () => (dispatch) => {
  return popularItemsAPI()
    .then(res => {
      debugger
      res.items.map((item, i)=>item.collectionName = res.collectionsName[i] )
      debugger
      dispatch(getItemsAC(res.items))
    })
}
export const getCollectionsAC = (collections) => ({
  type: GET_COLLECTIONS, collections
})
export const getItemsAC = (items) => ({
  type: GET_ITEMS, items
})

export const setContentAC = (contentType) => ({
  type: SET_CONTENT, contentType
})
