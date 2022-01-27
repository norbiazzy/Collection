import {loginUserAPI, registerUserAPI, verifyTokenAPI} from "../api/apiAuth";

const REG_USER = 'REG_USER'
const LOG_USER = 'LOG_USER'
const SET_TOKEN = 'SET_TOKEN'
const LOGIN_OUT = 'LOGIN_OUT'
const TOGGLE_ADMIN_MOD = 'TOGGLE_ADMIN_MOD'
const ERROR_REGISTER = 'ERROR_REGISTER'

const initialState = {
  userId: null,
  email: null,
  token: null,
  role: null,
  blocked: null,
  adminMod: false,
  errorMessage: null
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
    case ERROR_REGISTER:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}

export const toggleAdminModAC = (boolean) => ({
  type: TOGGLE_ADMIN_MOD,
  adminMod: boolean,
})


export const loginThunk = ({email, password}) => async (dispatch) => {
  debugger
  let res = await loginUserAPI({email, password})
  if (res) dispatch(loginAC(res))
}

export const verifyTokenThunk = (token) => async (dispatch) => {
  let res = await verifyTokenAPI(token)
  if (res) dispatch(loginAC(res))
  else loginOutAC()
}

export const registrationThunk = ({email, password, role}) => async (dispatch) => {
  let res = await registerUserAPI({email, password, role})
  if (res.err) dispatch(showErrMessageAC(res))
  else {
    dispatch(loginAC(res))
    return true
  }
}
export const loginOutThunk = () => {
  localStorage.removeItem('auth')
  return (dispatch) => {
    dispatch(loginOutAC())
  }
}
export const showErrMessageAC = (res) => ({
  type: ERROR_REGISTER,
  errorMessage: res.errorMessage,
})
export const hideErrMessageAC = () => ({
  type: ERROR_REGISTER,
  errorMessage: '',
})
export const loginOutAC = () => ({type: LOGIN_OUT})
export const setTokenAC = (token) => ({type: SET_TOKEN, token})
export const registerAC = ({email, password, role}) => ({type: REG_USER, email, password, role})
export const loginAC = ({email, token, role, blocked, userId}) => ({
  type: LOG_USER, email, token, role, blocked, userId,
})