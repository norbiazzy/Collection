const SHOW_MODAL = 'SHOW_MODAL'
const HIDE_MODAL = 'HIDE_MODAL'

const initialState = {
  isDisplay: false
}
export const modalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        isDisplay: action.isDisplay,
        message: action.message,
        title: action.title,
      }
    case HIDE_MODAL:
      return {
        ...state,
        isDisplay: action.isDisplay
      };
    default:
      return state;
  }
}

const showModalAC = (body) => ({
  type: SHOW_MODAL,
  isDisplay: true,
  message: body.message,
  title: body.title,
})


const hideModalAC = (body) => ({
  type: HIDE_MODAL,
  isDisplay: false,
})