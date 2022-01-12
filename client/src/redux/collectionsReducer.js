import {saveCollectionAPI, getCollectionAPI, saveItemAPI} from "../api/api";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTIONS = 'GET_COLLECTIONS'
const GET_COLLECTION = 'GET_COLLECTION'
const SAVE_COLLECTIONS_LIST = 'SAVE_COLLECTIONS_LIST'

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
  }
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
    case
    SAVE_COLLECTIONS_LIST:
      return {
        ...state,
        collections: action.collections
      };
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
    .then(collection => {
      dispatch(getCollectionAC(collection))
    }).then(()=>true)
}
export const saveItemThunk = (token, item) => (dispatch) => {
  return saveItemAPI(token, item)
    .then(res => {
      console.log(res)
      // dispatch(saveCollectionAC(res))
    }).then(()=>true)
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