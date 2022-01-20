import {
  saveCollectionAPI,
  getCollectionAPI,
  saveItemAPI,
  deleteItemAPI,
  likeItemAPI,
  dislikeItemAPI,
  saveUpdateItemAPI, addCommentAPI
} from "../api/api";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTIONS = 'GET_COLLECTIONS'
const GET_COLLECTION = 'GET_COLLECTION'
const SAVE_COLLECTIONS_LIST = 'SAVE_COLLECTIONS_LIST'
const GET_ITEMS = 'GET_ITEMS'
const LIKE_ITEM = 'LIKE_ITEM'
const DISLIKE_ITEM = 'DISLIKE_ITEM'

const initialState = {
  isItems: false,
  new_collection: {
    id: null,
    tags: [],
    name: null,
    description: null,
    topic: null,
    amountInputs: {
      num: [],
      sting: [],
      text: [],
      date: [],
      boolean: [],
    },
  },
  topics: ['Alcohol', 'Books', 'Films'],
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
  items: []
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
        items: [...state.items],
        ...state.items[action.index].likes = [...state.items[action.index].likes.filter(id => id !== action.userId)]
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
  debugger
  return addCommentAPI(token, comment)
.then(res => {
    debugger
    console.log(res)
    return res
  })
}

// export const getCollectionListThunk = (token) => () => {
//   getCollectionListAPI(token)
//     .then(r => {
//     })
// }

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

//
//
// export const getProfile = (userId) => {
//     return (dispatch) => {
//         getProfileUser(userId)
//             .then(profile => {
//             dispatch(getProfileAC(profile))
//         })
//     }
// }