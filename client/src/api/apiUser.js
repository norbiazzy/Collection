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
  let res = await fetch(`/api/home/user/${userId}`, {
    method: 'DELETE', headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}