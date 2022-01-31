import {
  blockUserAPI,
  deleteUserAPI,
  getProfileUserAPI,
  getUserListAPI, setAdminRoleAPI, setUserRoleAPI,
  unblockUserAPI,
  updateProfileAPI
} from "../api/apiUser";
import {getCollectionListAC} from "./collectionsReducer";
import {loginOutAC} from "./authReducer";

const GET_PROFILE = 'GET_PROFILE'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const GET_USER_LIST = 'GET_USER_LIST'
const SWITCH_ROLE = 'SWITCH_ROLE'
const UNBLOCK_USER = 'UNBLOCK_USER'
const BLOCK_USER = 'BLOCK_USER'

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
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.userList
      }
    case SWITCH_ROLE:
      return {
        ...state,
        userList: [...state.userList],
        ...state.userList.find(u => u._id === action.userId).role = action.role
      }
    case UNBLOCK_USER:
      
      return {
        ...state,
        userList: [...state.userList],
        ...state.userList.find(u => u._id === action.userId).blocked = false
      }
    case BLOCK_USER:
      
      return {
        ...state,
        userList: [...state.userList],
        ...state.userList.find(u => u._id === action.userId).blocked = true
      }
    default:
      return state;
  }
}

export const getUserListThunk = () => async (dispatch) => {
  
  let res = await getUserListAPI()
  let userList = res.users.map((user, i) => {
    
    user.name = res.profiles[i].name
    user.collectionsLength = user.collections.length
    return user
  })
  dispatch(getUserListAC(userList))
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
  let res =  await deleteUserAPI(token, userId)
  if (res && res.you) loginOutAC()
}
export const blockUserThunk = (token, userId) => async (dispatch) => {
  let res =  await blockUserAPI(token, userId)
  if (res && res.you) loginOutAC()
  dispatch(blockUserAC(userId))
}
export const unblockUserThunk = (token, userId) => async (dispatch) => {
  await unblockUserAPI(token, userId)
  dispatch(unblockUserAC(userId))
}
export const setUserRoleThunk = (token, userId) => async (dispatch) => {
  let res =  await setUserRoleAPI(token, userId)
  
  if (res) dispatch(switchRoleAC(userId, 'user'))
}
export const setAdminRoleThunk = (token, userId) => async (dispatch) => {
  let res =  await setAdminRoleAPI(token, userId)
  
  if (res) dispatch(switchRoleAC(userId, 'user'))
}

const getProfileAC = ({userId, photo, status, name, collections}, {role, blocked}) => ({
  type: GET_PROFILE, userId, photo, status, name, role, blocked, collectionsId: collections,
})
const getUserListAC = (userList) => ({  type: GET_USER_LIST, userList})
const switchRoleAC = (userId, role) => ({  type: SWITCH_ROLE, userId, role})
const unblockUserAC = (userId) => ({  type: UNBLOCK_USER, userId})
const blockUserAC = (userId) => ({  type: BLOCK_USER, userId})

const updateProfileAC = ({status, name}) => ({
    type: UPDATE_PROFILE,
    status: status,
    name: name,
  }
)