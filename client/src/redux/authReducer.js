import {loginUserAPI, registerUserAPI, verifyTokenAPI} from "../api/api";

const REG_USER = 'REG_USER'
const LOG_USER = 'LOG_USER'
const SET_TOKEN = 'SET_TOKEN'

const initialState = {
  userId: null,
  email: null,
  token: null,
  role: null,
  blocked: null,
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_USER:
      console.log('reducer reg')
      return {
        ...state,
      }
    case LOG_USER:
      console.log('reducer log')
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        role: action.role,
        blocked: action.blocked
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}


export const registerAC = ({email, password, role}) => ({type: REG_USER, email, password, role})
export const loginAC = ({email, token, role, blocked, userId}) => ({
  type: LOG_USER,
  email,
  token,
  role,
  blocked,
  userId
})

export const setTokenAC = (token) => ({type: SET_TOKEN, token})

export const verifyTokenThunk = (token) => (dispatch) => {
  verifyTokenAPI(token)
    .then((body) => {
      dispatch(loginAC(body))
    })
  
}

export const loginThunk = ({email, password}) => {
  return (dispatch) => {
    loginUserAPI({email, password})
      .then(body => {
        dispatch(loginAC(body))
      })
  }
}
export const registrationUserThunkCreate = ({email, password, role}) => {
  return (dispatch) => {
    registerUserAPI({email, password, role})
      .then((res) => {
        dispatch(registerAC(res))
        loginUserAPI({email, password})
          .then((body) => {
            window.localStorage.setItem('auth', JSON.stringify(body.token))
            dispatch(loginAC(body))
          })
      })
  }
}