import {bigCollectionsAPI, deleteUsersAPI, getUsersAPI, popularItemsAPI} from "../api/api";

const GET_COLLECTIONS = 'GET_COLLECTIONS'
const SET_CONTENT = 'SET_CONTENT'
const GET_ITEMS = 'GET_ITEMS'
const GET_USERS = 'GET_USERS'
// const SET_COLLECTION = 'SET_COLLECTION'

const initialState = {
  collections: [],
  contentType: 'collections',
  items: []
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
    case GET_ITEMS:
      return {
        ...state,
        items: action.items
      }
    case GET_USERS:
      return {
        ...state,
        users: action.users
      }
    default:
      return state;
  }
}

export const getCollectionsThunk = () => (dispatch) => {
  return bigCollectionsAPI()
    .then(collections => {
      dispatch(getCollectionsAC(collections))
    })
}
export const getItemsThunk = () => (dispatch) => {
  return popularItemsAPI()
    .then(res => {
      res.items.map((item, i) => {
        item.collectionName = res.collectionInfo.collectionsName[i]
        item.headersInp = res.collectionInfo.headersInp[i]
      })
      dispatch(getItemsAC(res.items))
    })
}
export const getUsersThunk = () => (dispatch) => {
  return getUsersAPI()
    .then(res => {

      dispatch(getUsersAC(res.users))
    })
}
export const deleteUsersThunk = (token, userId) => (dispatch) => {
  return deleteUsersAPI(token, userId)
    .then(res => {
      console.log(res)
    })
}
export const getCollectionsAC = (collections) => ({
  type: GET_COLLECTIONS, collections
})
export const getItemsAC = (items) => ({
  type: GET_ITEMS, items
})
export const getUsersAC = (users) => ({
  type: GET_USERS, users
})
export const setContentAC = (contentType) => ({
  type: SET_CONTENT, contentType
})
