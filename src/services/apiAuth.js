import { apiUrl } from '../utils/links'

export async function registerUser({ newUser, action }) {
  const res = await fetch(`${apiUrl}?action=${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser, action),
  })

  if (!res.ok) throw new Error('Could not register a new user')

  return await res.json()
}

export async function login({ user, action }) {
  const res = await fetch(`${apiUrl}?action=${action}`, {
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
  const res = await fetch(`${apiUrl}?action=logout`)
}
