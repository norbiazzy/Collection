let headers = {
    'Content-Type': 'application/json'
}
export const registerUser = (body) => {
    body = JSON.stringify(body)
    return fetch('/api/auth/register', {
        method: 'POST', body, headers
    }).then((res) => {
        console.log('api reg')
        return res.json()
    })
}
export const loginUser = ({email, password}) => {
    return fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers
    }).then((res) => {
        return res.json()
    }).then((body)=>{
        localStorage.setItem('auth', JSON.stringify(body))
        return body
    })
}


export const getProfileUser = (userId) => {
    let body = {userId}
    body = JSON.stringify(body)
    return fetch('/api/profile/getUser', {
        method: 'POST', body, headers
    }).then((res) => {
        console.log('api profile', res)
        return res.json()
    })
}
// let res = fetch('/api/auth/register', {
//  method: 'POST',
//  body: body,
//  headers
// }).then((res)=>{
//  return res.json()
// }).then((data)=>{
//
//  console.log(data.message)
// })
