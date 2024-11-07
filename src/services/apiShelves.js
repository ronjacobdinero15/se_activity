import { apiUrl } from '../utils/links'

export async function getShelves() {
  try {
    const res = await fetch(`${apiUrl}?action=getShelves`)

    if (!res.ok) throw new Error('Cannot retrieve shelves from the database')

    return res.json()
  } catch (error) {
    console.error(error.message)
  }
}

export async function getShelfData(shelf_id, action) {
  const res = await fetch(`${apiUrl}?shelf_id=${shelf_id}&action=${action}`)
  if (!res.ok) throw new Error('Could not fetch the shelf data')
  return res.json()
}

export async function getItemData(item_id, action) {
  const res = await fetch(`${apiUrl}?item_id=${item_id}&action=${action}`)
  if (!res.ok) throw new Error('Could not fetch the shelf data')
  return res.json()
}

export async function updateShelf({ shelf_id, shelf_name, updatedBy }) {
  const res = await fetch(`${apiUrl}?action=updateShelf`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf_id, shelf_name, updatedBy }),
  })

  if (!res.ok) throw new Error('Network response was not ok ' + res.statusText)

  return await res.json()
}

export async function updateItem({ item_id, item_name, price, updatedBy }) {
  const res = await fetch(`${apiUrl}?action=updateItem`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id, item_name, price, updatedBy }),
  })

  if (!res.ok) throw new Error('Network response was not ok ' + res.statusText)

  return await res.json()
}

export async function deleteShelve(shelf_id) {
  if (confirm('Are you sure you want to remove it?')) {
    await fetch(`${apiUrl}?shelf_id=${shelf_id}`, { method: 'DELETE' })
  }
}

export async function deleteItem(item_id) {
  if (confirm('Are you sure you want to remove it?')) {
    await fetch(`${apiUrl}?item_id=${item_id}`, {
      method: 'DELETE',
    })
  }
}

export async function insertShelf(shelfName, currentUser) {
  const res = await fetch(`${apiUrl}?action=insertShelf`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf_name: shelfName, currentUser }),
  })

  if (!res.ok) throw new Error('Error creating a new shelf')

  return await res.json()
}

export async function createItem({ itemObj }, currentUser) {
  const res = await fetch(`${apiUrl}?action=insertItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...itemObj, currentUser }),
  })

  if (!res.ok) throw new Error('Error creating a new shelf')

  return await res.json()
}
