import { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { insertShelf as insertShelfApi } from '../services/apiShelves'
import toast from 'react-hot-toast'

function AddShelf() {
  const navigate = useNavigate()
  const [shelfName, setShelfName] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))

  const { mutate: insertShelf } = useMutation({
    mutationFn: () => insertShelfApi(shelfName, user.username),
    onSuccess: data => {
      if (data.success) {
        toast.success('Shelf successfully added')
        navigate('/')
      }
    },
    onError: err => {
      toast.error(err.message)
    },
  })

  const handleSubmit = e => {
    e.preventDefault()

    if (!shelfName) return

    insertShelf()
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
            <form onSubmit={handleSubmit}>
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
