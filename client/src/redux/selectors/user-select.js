export const getProfile = (state)=>{
    return state.user.profile
}
export const getToken = (state)=>{
  return state.auth.token
}
export const getUserId = (state)=>{
    return state.auth.userId
}
export const getRole = (state)=>{
    return state.auth.role
}
export const getAdminMod = (state)=>{
    return state.auth.adminMod
}
export const getBlocked = (state)=>{
    return state.auth.blocked
}