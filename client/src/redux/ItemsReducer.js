import {
  addCommentAPI,
  deleteItemAPI,
  dislikeItemAPI, getCommentAPI,
  likeItemAPI,
  saveItemAPI,
  saveUpdateItemAPI
} from "../api/apiItem";

const GET_ITEMS = 'GET_ITEMS'
const LIKE_ITEM = 'LIKE_ITEM'
const DISLIKE_ITEM = 'DISLIKE_ITEM'
const DELETE_ITEM = 'LIKE_ITEM'
const UPDATE_ITEM = 'LIKE_ITEM'
const GET_COMMENTS = 'GET_COMMENTS'

const initialState = {
  itemList: []
}
export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      }
    default:
      return state;
  }
}

export const saveItemThunk = (token, item) => (dispatch) => {
  return saveItemAPI(token, item)
    .then(res => {
      console.log(res)
      // dispatch(saveCollectionAC(res))
    }).then(() => true)
}
export const getCollectionItemsThunk = (token, collectionId) => async (dispatch) => {
  let res = await getCollectionItemsAPI(token, collectionId)
  console.log(res)
  // dispatch(saveCollectionAC(res))
}
export const deleteItemThunk = (token, itemId) => (dispatch) => {
  return deleteItemAPI(token, itemId)
    .then(res => {
      console.log(res)
      // dispatch(saveCollectionAC(res))
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
export const getCommentAC = (comments) => ({type: GET_COMMENTS, comments})
export const likeAC = (index, userId) => ({type: LIKE_ITEM, index, userId})
export const dislikeAC = (index, userId) => ({type: DISLIKE_ITEM, index, userId})
export const getItemsAC = (items) => ({type: GET_ITEMS, items})