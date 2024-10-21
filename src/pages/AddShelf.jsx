import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { createShelf } from '../services/apiShelves'

function AddShelf() {
  const navigate = useNavigate()
  const [shelfName, setShelfName] = useState('')

  const { mutate } = useMutation({
    mutationFn: () => createShelf({ shelf_name: shelfName }),
    onSuccess: () => navigate('/'),
  })

  const handleSubmit = e => {
    e.preventDefault()
    mutate()
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">Add A New Shelf</div>
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
                <label htmlFor="shelf_name">Shelf Name</label>
                <input
                  type="text"
                  id="shelf_name"
                  name="shelf_name"
                  className="form-control"
                  onChange={e => setShelfName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input type="submit" className="btn btn-primary" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddShelf
