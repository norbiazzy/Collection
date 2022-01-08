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
export const verifyTokenAPI = (token) => {
    return fetch('/api/auth/verify', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers
    }).then((res) => {
        return res.json()
    })
}


export const getProfileUser = (userId) => {
    let body = {userId}
    body = JSON.stringify(body)
    return fetch('/api/profile/getUser', {
        method: 'POST', body, headers
    }).then((res) => {
        return res.json()
    })
}

export const saveCollectionAPI = () => {
    let body = {}
    body = JSON.stringify(body)
    return fetch('/api/collection/create', {
        method: 'POST', body, headers
    }).then((res) => {
        return res.json()
    })
}