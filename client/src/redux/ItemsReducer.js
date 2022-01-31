import {
  
  deleteItemAPI,
  dislikeItemAPI, getCollectionItemsAPI,  getItemListAPI,
  likeItemAPI,
  saveItemAPI,
  
} from "../api/apiItem";
import {getCollectionAC} from "./collectionsReducer";

const GET_ITEMS = 'GET_ITEMS'
const LIKE_ITEM = 'LIKE_ITEM'
const DISLIKE_ITEM = 'DISLIKE_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const GET_COMMENTS = 'GET_COMMENTS'
const ADD_ITEM_TO_LIST = 'ADD_ITEM_TO_LIST'

const initialState = {
  itemList: [],
  comments: {}
}
export const itemsReducer = (state = initialState, action) => {
  let itemIndex
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        itemList: action.items
      };
    case ADD_ITEM_TO_LIST:
      return {
        ...state,
        itemList: [action.item, ...state.itemList]
      };
    case LIKE_ITEM:
      itemIndex = state.itemList.findIndex((i) => i._id === action.itemId)
      
      return {
        ...state,
        itemList: [...state.itemList],
        ...state.itemList[itemIndex].likes = [...state.itemList[itemIndex].likes, action.userId]
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: [...state.itemList.filter(i => i._id !== action.itemId)],
        // ...state.items[action.index].likes = [...state.items[action.index].likes, action.userId]
      };
    case DISLIKE_ITEM:
      itemIndex = state.itemList.findIndex((i) => i._id === action.itemId)
      return {
        ...state,
        itemList: [...state.itemList],
        ...state.itemList[itemIndex].likes = [...state.itemList[itemIndex].likes.filter(id => id !== action.userId)]
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments: {...state.comments, [action.itemId]: action.comments}
      }
    default:
      return state;
  }
}

export const saveItemThunk = (token, item) => async (dispatch) => {
  
  let res = await saveItemAPI(token, item)
  if (res) dispatch(addItemToListAC(res))
  return true
}
export const getItemListThunk = () => async (dispatch) => {
  let res = await getItemListAPI()
  let ItemList = res.result.map(data => {
    data.item.collectionName = data.collectionInfo.name
    data.item.email = data.userInfo.email
    data.item.topic = data.collectionInfo.topic.label
    return data.item
  })
  if (res) dispatch(getItemsAC(ItemList.reverse()))
}
export const getCollectionItemsThunk = (token, collectionId) => async (dispatch) => {
  let res = await getCollectionItemsAPI(token, collectionId)
  if (res) {
    dispatch(getCollectionAC(res.collection))
    let sortedItemList = res.items.sort((a, b) => {
      return a.created < b.created ? 1 : -1
    })
    dispatch(getItemsAC(sortedItemList))
  }
}
export const deleteItemThunk = (token, itemId) => async (dispatch) => {
  let res = await deleteItemAPI(token, itemId)
  if (res) dispatch(deleteItemAC(itemId))
}

export const likeItemThunk = (token, itemId) => async (dispatch) => {
  let res = await likeItemAPI(token, itemId)
  if (res) dispatch(likeAC(itemId, res.userId))
}
export const dislikeItemThunk = (token, itemId) => async (dispatch) => {
  let res = await dislikeItemAPI(token, itemId)
  if (res) dispatch(dislikeAC(itemId, res.userId))
}
// export const saveUpdateItemThunk = (token, updateItem) => (dispatch) => {
//   return saveUpdateItemAPI(token, updateItem)
//     .then(res => {
//       console.log(res)
//       return res
//     })
// }
// export const addCommentThunk = (token, comment) => (dispatch) => {
//   return addCommentAPI(token, comment)
//     .then(res => {
//       return res
//     })
// }
export const addItemToListAC = (item) => ({
  type: ADD_ITEM_TO_LIST, item
})
// export const getCommentThunk = (itemId) => async (dispatch) => {
//   let res = await getCommentAPI(itemId)
//   const comments = res.comments.map((comment, i) => {
//     comment.name = res.names[i]
//     return comment
//   })
//   dispatch(getCommentAC(comments, itemId))
//   console.log('getComment')
//   return true
// }
// export const getCommentAC = (comments, itemId) => ({type: GET_COMMENTS, comments, itemId})
export const likeAC = (itemId, userId) => ({type: LIKE_ITEM, itemId, userId})
export const dislikeAC = (itemId, userId) => ({type: DISLIKE_ITEM, itemId, userId})
export const getItemsAC = (items) => ({type: GET_ITEMS, items})
export const deleteItemAC = (itemId) => ({type: DELETE_ITEM, itemId})