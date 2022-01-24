import {loginUserAPI, registerUserAPI, verifyTokenAPI} from "../api/api";

const REG_USER = 'REG_USER'
const LOG_USER = 'LOG_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGIN_OUT = 'LOGIN_OUT'
const TOGGLE_ADMIN_MOD = 'TOGGLE_ADMIN_MOD'

const initialState = {
  userId: null,
  email: null,
  token: null,
  role: null,
  blocked: null,
  adminMod: false,
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REG_USER:
      console.log('reducer reg')
      return {
        ...state,
      }
    case LOGIN_OUT:
      return {
        ...state,
        token: null
      }
    case LOG_USER:
      console.log('reducer log')

      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        role: action.role,
        blocked: action.blocked,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case TOGGLE_ADMIN_MOD:
      return {
        ...state,
        adminMod: action.adminMod,
      };
    default:
      return state;
  }
}

export const toggleAdminModAC = (boolean) => ({
  type: TOGGLE_ADMIN_MOD,
  adminMod: boolean,
})

export const registerAC = ({email, password, role}) => ({type: REG_USER, email, password, role})
export const loginAC = ({email, token, role, blocked, userId}) => ({
  type: LOG_USER, email, token, role, blocked, userId,
})

export const setTokenAC = (token) => ({type: SET_TOKEN, token})

export const verifyTokenThunk = (token) => (dispatch) => {
  return verifyTokenAPI(token)
    .then((res) => {
      if (res) dispatch(loginAC(res))
      else return 'is not auth'
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
export const registrationThunk = ({email, password, role}) => {
  return (dispatch) => {
    return registerUserAPI({email, password, role})
      .then(body => {
        debugger
        if (body) {
          dispatch(loginAC(body))
          return true
        } else return false
      })
  }
}
export const loginOutAC = () => ({
  type: LOGIN_OUT
})
export const loginOutThunk = () => {
  localStorage.removeItem('auth')
  return (dispatch) => {
    dispatch(loginOutAC())
  }
}