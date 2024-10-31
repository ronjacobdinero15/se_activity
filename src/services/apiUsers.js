import { apiUrl } from '../utils/links'

export async function getAllUsers() {
  const res = await fetch(`${apiUrl}?action=getAllUsers`)

  if (!res.ok) throw new Error('Error retrieving all users')

  return await res.json()
}

export async function getUserByID(user_id) {
  const res = await fetch(`${apiUrl}?action=getUserByID&user_id=${user_id}`)

  if (!res.ok) throw new Error('Error retrieving user data')

  return await res.json()
}
