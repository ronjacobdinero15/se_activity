import { apiUrl } from '../utils/links'

export async function registerUser(newUser) {
  const res = await fetch(`${apiUrl}?action=register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  })

  if (!res.ok) throw new Error('Could not register a new user')

  return await res.json()
}

export async function login(user) {
  const res = await fetch(`${apiUrl}?action=login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (!res.ok) throw new Error('Error occured logging in')

  return await res.json()
}

export async function logout() {
  await fetch(`${apiUrl}?action=logout`)
}
