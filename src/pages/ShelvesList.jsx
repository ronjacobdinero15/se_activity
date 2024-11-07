import { Link, useNavigate } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { logout as logoutApi } from '../services/apiAuth'
import {
  deleteShelve as deleteShelveApi,
  getShelves,
} from '../services/apiShelves'
import toast from 'react-hot-toast'
import Spinner from '../ui/Spinner'

function ShelvesList() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem('user')) || ''

  const { data: shelves = [], isLoading } = useQuery({
    queryKey: ['shelves'],
    queryFn: getShelves,
  })

  const { mutate: deleteShelve } = useMutation({
    mutationFn: id => deleteShelveApi(id),
    onSuccess: () => {
      toast.success('Shelf deleted successfully')
      queryClient.invalidateQueries({ active: true })
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success(`${user.username} is successfully logged out`)
      sessionStorage.removeItem('user')
      queryClient.clear()
      navigate('/login')
    },
  })

  if (isLoading) return <Spinner />

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <span className="lead">Ohayo gozaimasu, </span>
          <span className="text-danger font-weight-bold text-uppercase">
            {user.username}
          </span>
        </div>
        <button className="btn btn-primary" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-md-6">
              <b>Sampaloc 0 | 7-11 Franchise Shelves/Racks</b>
            </div>
            <div className="col-md-6">
              <Link to="/addShelf" className="btn btn-success btn-sm float-end">
                Add
              </Link>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Shelf ID</th>
                <th>Shelf Name</th>
                <th>Date Added</th>
                <th>Added By</th>
                <th>Last Updated</th>
                <th>Updated By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shelves.map(shelf => (
                <tr key={shelf.shelf_id}>
                  <td>{shelf.shelf_id}</td>
                  <td>{shelf.shelf_name}</td>
                  <td>{shelf.date_added}</td>
                  <td>
                    <Link to={`/user/${user.user_id}`}>{shelf.added_by}</Link>
                  </td>
                  <td>{shelf.last_updated}</td>
                  <td>{shelf.updated_by}</td>
                  <td
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Link
                      to={`/shelf/${shelf.shelf_id}`}
                      className="btn btn-sm text-primary"
                    >
                      View items
                    </Link>
                    <div>
                      <Link
                        to={`/edit/shelf/${shelf.shelf_id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      &nbsp;
                      <button
                        type="button"
                        onClick={() => deleteShelve(shelf.shelf_id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ShelvesList
