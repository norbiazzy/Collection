let headers = {
  'Content-Type': 'application/json'
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
export const getCollectionItemsAPI = async (token, collectionId) => {
  let res = await fetch('/api/collection/getCollection/' + collectionId, {
    method: 'GET', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  return await res.json()
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
export const popularItemsAPI = () => {
  return fetch('/api/home/popularItems', {
    method: 'GET', headers: {
      ...headers
    }
  }).then((res) => {
    return res.json()
  })
}