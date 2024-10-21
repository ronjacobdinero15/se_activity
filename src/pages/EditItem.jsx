import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getItemData, updateItem } from '../services/apiShelves'

function EditItem() {
  let navigate = useNavigate()
  const { item_id } = useParams()
  const [itemName, setItemName] = useState('')
  const [price, setPrice] = useState(0)

  const { data: item, status } = useQuery({
    queryKey: ['item', item_id],
    queryFn: () => getItemData(item_id, 'edit_item'),
  })

  useEffect(() => {
    if (status === 'success' && item) {
      setItemName(item.item_name)
      setPrice(item.price)
    }
  }, [status, item])

  const { mutate } = useMutation({
    mutationFn: () => updateItem(itemName, price, item_id),
    onSuccess: () => navigate(-1),
  })

  const handleSubmit = e => {
    e.preventDefault()
    mutate()
  }

  if (status === 'loading') return <div>Loading...</div>

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Edit Item</div>
          <div className="col-md-6">
            <Link to="/" className="btn btn-success btn-sm float-end">
              View All
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4">&nbsp;</div>
          <div className="col-md-4">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="item_name">Item Name</label>
                <input
                  type="text"
                  id="item_name"
                  name="item_name"
                  className="form-control"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  name="editBtn"
                  className="btn btn-primary"
                  value="Save"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditItem
