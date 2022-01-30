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
export const deleteCollectionAPI = async (token, id) => {

  let res = await fetch(`/api/collection/${id}`, {method: 'DELETE', headers: {Authorization: `Bearer ${token}`}})
  return res.status === 200
}


export const saveCollectionAPI = async (body, token) => {
  body = JSON.stringify(body)
  let res = await fetch('/api/collection/create', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
    return res.status === 200 ? await res.json() : false
}
export const updateCollectionAPI = async (token, updates) => {
  const body = JSON.stringify(updates)
  let res = await fetch('/api/collection/update', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  return res.status === 200 ? await res.json() : false
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

