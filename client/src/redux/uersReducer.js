import {deleteUserAPI, getProfileUserAPI} from "../api/apiUser";
import {getCollectionListAC} from "./collectionsReducer2";

const GET_PROFILE = 'GET_PROFILE'


const initialState = {
  profile: {
    userId: null,
    photo: null,
    status: null,
    name: null,
    collectionsId: []
  },
  userList: []
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: {
          photo: action.photo,
          status: action.status,
          name: action.name,
          collections: action.collections,
          userId: action.userId
        }
      }
    default:
      return state;
  }
}

export const getProfileThunk = (token, profileId) => async (dispatch) => {
  let res = await getProfileUserAPI(token, profileId)
  if (res) {
    dispatch(getProfileAC(res.profile))
    dispatch(getCollectionListAC(res.collections))
    return true
  }
}

export const deleteUserThunk = (token, userId) => async (dispatch) => {
  let res = await deleteUserAPI(token, userId)
  if (res) console.log()
}

const getProfileAC = (user) => ({
  type: GET_PROFILE,
  userId: user.userId,
  photo: user.photo,
  status: user.status,
  name: user.name,
  collectionsId: user.collections,
})