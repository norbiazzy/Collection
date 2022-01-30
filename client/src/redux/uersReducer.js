import {blockUserAPI, deleteUserAPI, getProfileUserAPI, unblockUserAPI, updateProfileAPI} from "../api/apiUser";
import {getCollectionListAC} from "./collectionsReducer2";

const GET_PROFILE = 'GET_PROFILE'
const UPDATE_PROFILE = 'UPDATE_PROFILE'


const initialState = {
  profile: {
    blocked: null,
    role: null,
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
          userId: action.userId,
          role: action.role,
          blocked: action.blocked
        }
      }
    case UPDATE_PROFILE:

      return {
        ...state,
        profile: {
          ...state.profile,
          name: action.name,
          status: action.status
        }
      }
    default:
      return state;
  }
}

export const getProfileThunk = (token, profileId) => async (dispatch) => {
  let res = await getProfileUserAPI(token, profileId)
  if (res) {

    dispatch(getProfileAC(res.profile, res.user))
    let sortedCollectionList = res.collections.sort((a, b) => {
      return a.created < b.created ? 1 : -1
    })
    dispatch(getCollectionListAC(sortedCollectionList))
    return true
  }
  return false
}
export const updateProfileThunk = (token, updates) => async (dispatch) => {

  let res = await updateProfileAPI(token, updates)
  if (res) dispatch(updateProfileAC(updates))
}

export const deleteUserThunk = (token, userId) => async (dispatch) => {
  return await deleteUserAPI(token, userId)
}
export const blockUserThunk = (token, userId) => async (dispatch) => {

  return await blockUserAPI(token, userId)
}
export const unblockUserThunk = (token, userId) => async (dispatch) => {
  return await unblockUserAPI(token, userId)
}

const getProfileAC = ({userId, photo, status, name, collections}, {role, blocked}) => ({
  type: GET_PROFILE, userId, photo, status, name, role, blocked, collectionsId: collections,
})

const updateProfileAC = ({status, name}) => ({
    type: UPDATE_PROFILE,
    status: status,
    name: name,
  }
)