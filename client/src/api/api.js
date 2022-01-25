let headers = {
  'Content-Type': 'application/json'
}
export const registerUserAPI = (body) => {
  body = JSON.stringify(body)
  return fetch('/api/auth/register', {
    method: 'POST', body, headers
  }).then((res) => {
    return res.json()
  }).then(res => {
    if (!res.err) localStorage.setItem('auth', JSON.stringify({token: body.token}))
    return res
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
    localStorage.setItem('auth', JSON.stringify({token: body.token}))
    return body
  })
}
export const verifyTokenAPI = (token) => {

  return fetch('/api/auth/verify/', {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {

    if (res.status === 200) return res.json()
    else return false
  })
}


export const getProfileUserAPI = (token = null, profileId = '') => {

  return fetch('/api/profile/getUser' + (profileId ? '/' + profileId : ''), {
    method: 'GET', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  }).then(res => {

    console.log(res)
    return res
  })
}

export const getCollectionAPI = (token, id) => {
  return fetch('/api/collection/' + id, {
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
export const saveUpdateItemAPI = (token, updateItem) => {
  let body = JSON.stringify(updateItem)

  return fetch('/api/collection/updateItem', {
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
export const addCommentAPI = (token, comment) => {
  let body = JSON.stringify(comment)
  return fetch('/api/collection/comment', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    return res.json()
  })
}
export const getCommentAPI = (itemId) => {

  return fetch('/api/collection/comment/' + itemId, {
    method: 'GET', headers
  }).then((res) => {

    return res.json()
  })
}
export const bigCollectionsAPI = () => {
  return fetch('/api/home/bigCollections', {
    method: 'GET', headers: {
      ...headers
    }
  }).then((res) => {
    return res.json()
  })
}
export const popularItemsAPI = () => {
  return fetch('/api/home/popularItems', {
    method: 'GET', headers: {
      ...headers
    }
  }).then((res) => {
    return res.json()
  })
}
export const getUsersAPI = () => {
  return fetch('/api/home/users', {
    method: 'GET', headers: {
      ...headers
    }
  }).then((res) => {
    return res.json()
  })
}
export const deleteUsersAPI = (token, userId) => {
  return fetch(`/api/home/user/${userId}`, {
    method: 'DELETE', headers: {
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


