import {getProfileUser, registerUser} from "../api/api";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTIONS = 'GET_COLLECTIONS'

const initialState = {
    userId: null,
    photo: null,
    status: null,
    name: null,
    collections: null,
}
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                photo: action.photo,
                status: action.status,
                name: action.name,
                collections: action.collections
            }
        case GET_COLLECTIONS:
            return {...state};
        default:
            return state;
    }
}

const getProfileAC = (profile) => ({
    type: GET_PROFILE,
    userId: profile.userId,
    photo: profile.photo,
    status: profile.status,
    name: profile.name,
    collections: profile.collections,
})


export const getProfile = (userId) => {
    return (dispatch) => {
        getProfileUser(userId)
            .then(profile => {
            dispatch(getProfileAC(profile))
        })
    }
}