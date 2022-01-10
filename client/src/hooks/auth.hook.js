// import {useCallback, useEffect, useState} from "react";
//
// const userData = 'userData'
//
// export const useAuth = () => {
//   const [token, setToken] = useState(null)
//   const [ready, setReady] = useState(false)
//   const [userId, setUserId] = useState(null)
//
//   const login = useCallback((jwtToken, userId) => {
//     setToken(jwtToken)
//     setUserId(userId)
//
//     localStorage.setItem(userData, JSON.stringify({
//       userId, jwtToken
//     }))
//   }, [])
//
//   const logout = useCallback(() => {
//     setToken(null)
//     setUserId(null)
//     localStorage.removeItem(userData)
//   }, [])
//
//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem(userData))
//     data ? login(data.jwtToken, data.userId) : setReady(true)
//   }, [login])
//
//   return [login, logout, token, userId, ready]
// }