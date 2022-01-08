import {getProfileUser, registerUser} from "../api/api";

const GET_PROFILE = 'GET_PROFILE'
const GET_COLLECTIONS = 'GET_COLLECTIONS'

const initialState = {
    new_collection: {
        id: null,
        tags: [],
        name: null,
        description: null,
        topic: null,
        amountInputs: {
            numb: 0,
            sting: 0,
            text: 0,
            date: 0,
            boolean: 0,
        },
    },
    topics: ['Alcohol', 'Books', 'Films'],
    maxAmountInputs: {
        numb: 3,
        sting: 3,
        text: 3,
        date: 3,
        boolean: 3,
    },
    photo: null,
    status: null,
    name: null,
    collections: null,
    isProfile: false
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
        case GET_COLLECTIONS:
            return {...state};
        default:
            return state;
    }
}

export const saveCollectionThunk = (name, description, topic, {str, numb, text, boolean, date}) => ({

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