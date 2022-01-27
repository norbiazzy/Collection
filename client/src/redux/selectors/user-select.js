export const getProfile = (state)=>{
  console.log(state)
    return state.user.profile
}
export const getToken = (state)=>{
  console.log(state)

  return state.auth.token
}
export const getUserId = (state)=>{
    console.log(state)

    return state.auth.userId
}
export const getRole = (state)=>{
    console.log(state)

    return state.auth.role
}
export const getAdminMod = (state)=>{
    console.log(state)

    return state.auth.adminMod
}