import {getProfileUserAPI} from "../api/api";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTIONS = 'GET_COLLECTIONS'

const initialState = {
  userId: null,
  photo: null,
  status: null,
  name: null,
  collections: null,
  isProfile: false
}
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        photo: action.photo,
        status: action.status,
        name: action.name,
        collections: action.collections,
        userId: action.userId
      }
    case GET_COLLECTIONS:
      return {...state};
    default:
      return state;
  }
}

const getProfileAC = (user) => ({
  type: GET_PROFILE,
  userId: user.profile.userId,
  photo: user.profile.photo,
  status: user.profile.status,
  name: user.profile.name,
  collections: user.collections,
})


export const getProfileThunk = (token, profileId) => {
  return (dispatch) => {
    return getProfileUserAPI(token, profileId)
      .then(profile => {

        dispatch(getProfileAC(profile))
      })
  }
}