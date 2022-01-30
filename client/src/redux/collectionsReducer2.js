import {deleteCollectionAPI, getCollectionAPI, saveCollectionAPI, updateCollectionAPI} from "../api/apiCollection";


const GET_COLLECTION = 'GET_COLLECTION'
const GET_COLLECTION_LIST = 'GET_COLLECTION_LIST'
const DELETE_COLLECTION = 'DELETE_COLLECTION'
const UPDATE_COLLECTION = 'UPDATE_COLLECTION'
const ADD_COLLECTION_TO_LIST = 'ADD_COLLECTION_TO_LIST'

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
        collectionList: [...state.collectionList.filter(c => c._id !== action.collectionId)]
      }
    case
    UPDATE_COLLECTION:
      return {
        ...state,
        collection: {
          ...state.collection,
          name: action.name,
          description: action.description,
          topic: action.topic
        }
      }
    case
    ADD_COLLECTION_TO_LIST:
      return {
        ...state,
        collectionList: [action.collection, ...state.collectionList],
      }
    default:
      return state;
  }
}

export const saveCollectionThunk = (body, token) => async (dispatch) => {
  let res = await saveCollectionAPI(body, token)
  if (res) dispatch(addCollectionToListAC(res))
}

export const updateCollectionThunk = (token, updates) => async (dispatch) => {
  let res = await updateCollectionAPI(token, updates)
  if (res) dispatch(updateCollectionAC(updates))
}

export const getCollectionAC = (collection) => ({type: GET_COLLECTION, collection})
export const getCollectionListAC = (collectionList) => ({type: GET_COLLECTION_LIST, collectionList})
export const addCollectionToListAC = (collection) => ({type: ADD_COLLECTION_TO_LIST, collection})

export const getCollectionThunk = (token, id) => async (dispatch) => {
  let object = await getCollectionAPI(token, id)
  dispatch(getCollectionAC(object.collection))
  return true
}
export const deleteCollectionThunk = (token, collectionId) => async (dispatch) => {
  let res = await deleteCollectionAPI(token, collectionId)
  if (res) dispatch(deleteCollectionAC(collectionId))
}

export const deleteCollectionAC = (collectionId) => ({type: DELETE_COLLECTION, collectionId})
export const updateCollectionAC = ({name, description, topic}) => ({type: UPDATE_COLLECTION, name, description, topic})
