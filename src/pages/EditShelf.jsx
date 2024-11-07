import { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'

import { useMutation, useQuery } from '@tanstack/react-query'

import { getShelfData, updateShelf } from '../services/apiShelves'
import toast from 'react-hot-toast'

function EditShelf() {
  let navigate = useNavigate()
  const { shelf_id } = useParams()
  const [shelfName, setShelfName] = useState('')
  const user = JSON.parse(sessionStorage.getItem('user'))

  const { data: shelf, status } = useQuery({
    queryKey: ['shelf', shelf_id],
    queryFn: () => getShelfData(shelf_id, 'edit'),
  })

  useEffect(() => {
    if (status === 'success' && shelf) {
      setShelfName(shelf.shelf_name)
    }
  }, [status, shelf])

  const { mutate } = useMutation({
    mutationFn: () =>
      updateShelf({
        shelf_id,
        shelf_name: shelfName,
        updatedBy: user.username,
      }),
    onSuccess: () => {
      toast.success('Item successfully edited')
      navigate('/')
    },
    onError: err => {
      toast.error(err.message)
    },
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
          <div className="col-md-6">Edit Shelf</div>
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
                  value={shelfName}
                  onChange={e => setShelfName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  name="editBtn"
                  className="btn btn-primary"
                  disabled={
                    shelf?.shelf_name ? shelfName === shelf.shelf_name : false
                  }
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

export default EditShelf
