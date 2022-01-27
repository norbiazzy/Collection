import {deleteCollectionAPI, getCollectionAPI, saveCollectionAPI} from "../api/apiCollection";


const GET_COLLECTION = 'GET_COLLECTION'
const GET_COLLECTION_LIST = 'GET_COLLECTION_LIST'
const DELETE_COLLECTION = 'DELETE_COLLECTION'
const UPDATE_COLLECTION = 'DELETE_COLLECTION'

const initialState = {
  collection: null, // текущая коллекция
  collectionList: [], //список коллекций
  topics: [
    {value: 'alcohol', label: 'Alcohol'},
    {value: 'books', label: 'Books'},
    {value: 'films', label: 'Films'},
    {value: 'marks', label: 'Marks'},
    {value: 'pens', label: 'Pens'},
    {value: 'friends', label: 'Friends'},
    {value: 'wrappers', label: 'Wrappers'},
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
  ],
}
export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COLLECTION:
      return {
        ...state,
        collection: action.collection,
      }
    case GET_COLLECTION_LIST:
      return {
        ...state,
        collectionList: action.collectionList,
      }
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: [...state.items],
        ...state.items[action.index].likes = [...state.items[action.index].likes.filter(id => id !== action.userId)]
      }
    default:
      return state;
  }
}

export const saveCollectionThunk = (body, token) => async (dispatch) => {
  let res = await saveCollectionAPI(body, token)
}

export const getCollectionAC = (collection) => ({  type: GET_COLLECTION, collection})
export const getCollectionListAC = (collectionList) => ({  type: GET_COLLECTION_LIST, collectionList})

export const getCollectionThunk = (token, id) => async (dispatch) => {
  let object = await getCollectionAPI(token, id)
  dispatch(getCollectionAC(object.collection))
  return true
}
export const deleteCollectionThunk = (token, collectionId) => (dispatch) => {
  return deleteCollectionAPI(token, collectionId)
    .then(res => {
      console.log(res)
      dispatch(deleteCollectionAC(collectionId))
    })
}

export const deleteCollectionAC = (index, collectionId) => ({
  type: DELETE_COLLECTION, index, collectionId
})
