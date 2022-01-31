let headers = {
  'Content-Type': 'application/json'
}
export const saveItemAPI = async (token, item) => {
  
  let body = await JSON.stringify(item)
  let res = await fetch('/api/collection/createItem', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  return res.status === 200 ? await res.json() : false
}
export const getCollectionItemsAPI = async (token, collectionId) => {
  
  let res = await fetch('/api/collection/' + collectionId, {
    method: 'GET', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  
  return res.json()
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
export const deleteItemAPI = async (token, itemId) => {
  let body = JSON.stringify({itemId})
  let res = await fetch('/api/collection/deleteItem', {
    method: 'POST', body, headers: {...headers, Authorization: `Bearer ${token}`}
  })
  return res.status === 200
}

export const likeItemAPI = async (token, itemId) => {
  let body = JSON.stringify({itemId})
  let res = await fetch('/api/collection/likeItem', {
    method: 'POST', body, headers: {...headers, Authorization: `Bearer ${token}`}
  })
  return res.status === 200 ? await res.json() : false
}

export const dislikeItemAPI = async (token, itemId) => {
  let body = JSON.stringify({itemId})
  let res = await fetch('/api/collection/dislikeItem', {
    method: 'POST', body, headers: {...headers, Authorization: `Bearer ${token}`}
  })
  
  return res.status === 200 ? await res.json() : false
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
export const getCommentAPI = async (itemId) => {
  let res = await fetch('/api/collection/comment/' + itemId, {method: 'GET', headers})
  return await res.json()
  
}
export const getItemListAPI = async () => {
  let res = await fetch('/api/collection/itemList', {method: 'GET', headers: {...headers}})
  
  if (res.status === 200) return  await res.json()
}