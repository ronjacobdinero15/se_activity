import { apiUrl } from '../utils/links'

export async function getShelves() {
  try {
    const res = await fetch(apiUrl)

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

export async function updateShelf({ shelfName, shelf_id }) {
  const res = await fetch(`${apiUrl}?shelf_id=${shelf_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf_name: shelfName, shelf_id }),
  })

  if (!res.ok) throw new Error('Network response was not ok ' + res.statusText)

  return res.json()
}

export async function updateItem(itemName, price, item_id) {
  const res = await fetch(`${apiUrl}?item_id=${item_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_name: itemName, price, item_id }),
  })

  if (!res.ok) throw new Error('Network response was not ok ' + res.statusText)

  return res.json()
}

export async function deleteShelve(shelf_id) {
  if (confirm('Are you sure you want to remove it?')) {
    await fetch(`${apiUrl}?shelf_id=${shelf_id}`, { method: 'DELETE' })
  }
}

export async function deleteItem(item_id) {
  if (confirm('Are you sure you want to remove it?')) {
    await fetch(`${apiUrl}?item_id=${item_id}`, { method: 'DELETE' })
  }
}

export async function createShelf(shelf_name) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(shelf_name),
  })

  if (!res.ok) throw new Error('Error creating a new shelf')

  return res.json()
}

export async function createItem(item_obj) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item_obj),
  })

  if (!res.ok) throw new Error('Error creating a new shelf')

  return res.json()
}
