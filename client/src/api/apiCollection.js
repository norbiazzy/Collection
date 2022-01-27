let headers = {
  'Content-Type': 'application/json'
}

export const getCollectionAPI = async (token, id) => {
  let res = await fetch('/api/collection/' + id, {
    method: 'GET', headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res
}
export const deleteCollectionAPI = (token, id) => {

  return fetch('/api/collection/' + id, {
    method: 'DELETE', headers: {
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
export const bigCollectionsAPI = () => {
  return fetch('/api/home/bigCollections', {
    method: 'GET', headers: {
      ...headers
    }
  }).then((res) => {
    return res.json()
  })
}

