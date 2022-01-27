import {deleteCollectionAPI, getCollectionAPI, saveCollectionAPI} from "../api/apiCollection";
import {
  addCommentAPI,
  deleteItemAPI,
  dislikeItemAPI, getCommentAPI,
  likeItemAPI,
  saveItemAPI,
  saveUpdateItemAPI
} from "../api/apiItem";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTION = 'GET_COLLECTION'
const SAVE_COLLECTIONS_LIST = 'SAVE_COLLECTIONS_LIST'
const GET_ITEMS = 'GET_ITEMS'
const LIKE_ITEM = 'LIKE_ITEM'
const DISLIKE_ITEM = 'DISLIKE_ITEM'
const GET_COMMENTS = 'GET_COMMENTS'
const DELETE_COLLECTION = 'DELETE_COLLECTION'

const initialState = {
  isItems: false,
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
  photo: null,
  status: null,
  name: null,
  collections: [],
  currentCollection: {
    name: '',
    description: '',
    created: '',
    items: [],
    amountInputs: {}
  },
  items: [],
  comments: []
}
export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        photo: action.photo,
        status: action.status,
        name: action.name,
        collections: action.collections,
        isProfile: true
      }
    case GET_COLLECTION:
      return {
        ...state,
        currentCollection: action.collection,
        isItems: true
      }
    case SAVE_COLLECTIONS_LIST:

      return {
        ...state,
        collections: action.collections
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.items
      };
    case LIKE_ITEM:
      return {
        ...state,
        items: [...state.items],
        ...state.items[action.index].likes = [...state.items[action.index].likes, action.userId]
      };
    case DISLIKE_ITEM:
      return {
        ...state,
        collections: [...state.collections],

      }
    case DELETE_COLLECTION:
      return {
        ...state,
        collections: [...state.items],
        ...state.items[action.index].likes = [...state.items[action.index].likes.filter(id => id !== action.userId)]
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      }
    default:
      return state;
  }
}

export const saveCollectionThunk = (body, token) => () => {
  saveCollectionAPI(body, token)
    .then(r => {
      console.log(r)
    })
}

export const getCollectionAC = (collection) => ({
  type: GET_COLLECTION, collection
})

export const getCollectionThunk = (token, id) => (dispatch) => {
  return getCollectionAPI(token, id)
    .then(object => {

      dispatch(getCollectionAC(object.collection))
      dispatch(getItemsAC(object.items))
    }).then(() => true)
}
export const getItemsAC = (items) => ({
  type: GET_ITEMS, items
})
export const saveItemThunk = (token, item) => (dispatch) => {
  return saveItemAPI(token, item)
    .then(res => {
      console.log(res)
      // dispatch(saveCollectionAC(res))
    }).then(() => true)
}
export const deleteItemThunk = (token, itemId) => (dispatch) => {
  return deleteItemAPI(token, itemId)
    .then(res => {
      console.log(res)
      // dispatch(saveCollectionAC(res))
    })
}
export const deleteCollectionThunk = (token, collectionId) => (dispatch) => {
    deleteCollectionAPI(token, collectionId)
    .then(res => {
      console.log(res)
      dispatch(deleteCollectionAC(collectionId))
    })
}
export const likeItemThunk = (token, itemId, index) => (dispatch) => {
  return likeItemAPI(token, itemId)
    .then(res => {

      if (res.userId) dispatch(likeAC(index, res.userId))
      // dispatch(saveCollectionAC(res))
    })
}
export const dislikeItemThunk = (token, itemId, index) => (dispatch) => {

  return dislikeItemAPI(token, itemId)
    .then(res => {

      if (res.userId) dispatch(dislikeAC(index, res.userId))
      // dispatch(saveCollectionAC(res))
    })
}
export const saveUpdateItemThunk = (token, updateItem) => (dispatch) => {
  return saveUpdateItemAPI(token, updateItem)
    .then(res => {
      console.log(res)
      return res
    })
}
export const addCommentThunk = (token, comment) => (dispatch) => {
  return addCommentAPI(token, comment)
    .then(res => {
      return res
    })
}
export const getCommentThunk = (itemId) => (dispatch) => {
  return getCommentAPI(itemId)
    .then(res => {
      const comments = res.comments.map((comment, i) => {
        comment.name = res.names[i]
        return comment
      })
      dispatch(getCommentAC(comments))
      return comments
    })
}
export const getCommentAC = (comments) => ({
  type: GET_COMMENTS, comments
})

export const saveCollectionsList = (collections) => ({
  type: SAVE_COLLECTIONS_LIST,
  collections
})
export const likeAC = (index, userId) => ({
  type: LIKE_ITEM, index, userId
})
export const dislikeAC = (index, userId) => ({
  type: DISLIKE_ITEM, index, userId
})
export const deleteCollectionAC = (index, collectionId) => ({
  type: DELETE_COLLECTION, index, collectionId
})
