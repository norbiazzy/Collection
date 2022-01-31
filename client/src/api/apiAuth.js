let headers = {
  'Content-Type': 'application/json'
}
export const registerUserAPI = async (body) => {
  body = JSON.stringify(body)
  let res = await fetch('/api/auth/register', {
    method: 'POST', body, headers
  })
  return await res.json()
}

export const loginUserAPI = async ({email, password}) => {
  
  let res = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({email, password}),
    headers
  })
  if (res.status ===200) {
    res = await res.json()
    localStorage.setItem('auth', JSON.stringify({token: res.token}))
    return res
  }
}
export const verifyTokenAPI = async token => {
  let res = await fetch('/api/auth/verify', {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 200) return res.json()
  return false

}

