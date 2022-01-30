let headers = {
  'Content-Type': 'application/json'
}

export const getProfileUserAPI = async (token = null, profileId = '') => {
  let res = await fetch('/api/profile/getUser' + (profileId ? '/' + profileId : ''), {
    method: 'GET', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 200) return res.json()
  return false
}
export const updateProfileAPI = async (token, body) => {
  body = JSON.stringify(body)
  let res = await fetch('/api/profile/update', {
    method: 'POST', body, headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  return res.status === 200;

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
export const deleteUserAPI = async (token, userId) => {
  let res = await fetch(`/api/profile/user/${userId}`, {
    method: 'DELETE', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  return res.status === 200
}
export const blockUserAPI = async (token, userId) => {

  let res = await fetch(`/api/profile/blockUser/${userId}`, {
    method: 'DELETE',
    headers: {...headers, Authorization: `Bearer ${token}`}
  })
  return res.status === 200
}
export const unblockUserAPI = async (token, userId) => {
  let res = await fetch(`/api/profile/unblockUser/${userId}`, {
    method: 'DELETE', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  return res.status === 200
}