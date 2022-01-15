let headers = {
  'Content-Type': 'application/json'
}
export const registerUserAPI = (body) => {
  body = JSON.stringify(body)
  return fetch('/api/auth/register', {
    method: 'POST', body, headers
  }).then((res) => {
    console.log('api reg')
    return res.json()
  })
}
export const loginUserAPI = ({email, password}) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers
  }).then((res) => {
    return res.json()
  }).then((body) => {
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


export const getProfileUserAPI = (token) => {
  // let body = JSON.stringify({userId})
  return fetch('/api/profile/getUser', {
    method: 'GET', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    
    return res.json()
  }).then(res=>{
    
    console.log(res)
    return res
  })
}

export const getCollectionAPI = (token, id) => {
  return fetch('/api/collection/'+id, {
    method: 'GET', headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
export const saveItemAPI = (token, item) => {
  let body = JSON.stringify(item)
  return fetch('/api/collection/createItem', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
export const deleteItemAPI = (token, itemId) => {
  let body = JSON.stringify({itemId})
  return fetch('/api/collection/deleteItem', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
export const likeItemAPI = (token, itemId) => {
  let body = JSON.stringify({itemId})
  return fetch('/api/collection/likeItem', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
export const dislikeItemAPI = (token, itemId) => {
  let body = JSON.stringify({itemId})
  return fetch('/api/collection/dislikeItem', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}

export const saveCollectionAPI = (body, token) => {
  body = JSON.stringify(body)
  return fetch('/api/collection/create', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
//
// export const getCollectionListAPI = (token) => {
//   let body = JSON.stringify({})
//
//   return fetch('/api/collection/getCollectionsList', {
//     method: 'POST',body, headers: {
//       ...headers,
//       Authorization: `Bearer ${token}`
//     }
//   }).then((res) => {
//
//     console.log(res)
//     return res.json()
//   })
// }


