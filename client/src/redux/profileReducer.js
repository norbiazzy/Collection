import {getProfileUserAPI} from "../api/apiUser";
import {getCollectionAC, getCollectionListAC} from "./collectionsReducer2";
//
// const GET_PROFILE = 'GET_PROFILE'
// const GET_COLLECTIONS = 'GET_COLLECTIONS'
//
// const initialState = {
//   userId: null,
//   photo: null,
//   status: null,
//   name: null,
//   collectionsId: null,
//   isProfile: false
// }
// export const profileReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_PROFILE:
//       return {
//         ...state,
//         photo: action.photo,
//         status: action.status,
//         name: action.name,
//         collections: action.collections,
//         userId: action.userId
//       }
//     case GET_COLLECTIONS:
//       return {...state};
//     default:
//       return state;
//   }
// }

// const getProfileAC = (user) => ({
//   type: GET_PROFILE,
//   userId: user.profile.userId,
//   photo: user.profile.photo,
//   status: user.profile.status,
//   name: user.profile.name,
//   collectionsId: user.collections,
// })
//
//
// export const getProfileThunk = (token, profileId) => async (dispatch) => {
//   let res = await getProfileUserAPI(token, profileId)
//   debugger
//   if (res) {
//     dispatch(getProfileAC(res.profile))
//     dispatch(getCollectionListAC(res.collections))
//     return true
//   } else return false
//
// }