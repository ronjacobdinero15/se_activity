import { Link, useNavigate } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { logout as logoutApi } from '../services/apiAuth'
import {
  deleteShelve as deleteShelveApi,
  getShelves,
} from '../services/apiShelves'
import UserList from '../ui/UserList'
import Users from '../ui/Users'

function ShelvesList() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const currentUser = sessionStorage.getItem('username')

  const { data: shelves = [] } = useQuery({
    queryKey: ['shelves'],
    queryFn: getShelves,
  })

  const { mutate: deleteShelve } = useMutation({
    mutationFn: id => deleteShelveApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true })
    },
  })

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      sessionStorage.removeItem('username')
      queryClient.clear()
      navigate('/login')
    },
  })

  if (status === 'loading') return <div>Loading...</div>

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="lead">
          Ohayo gozaimasu, <span className="text-danger">{currentUser}</span>
        </h1>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {shelves.map(shelf => (
                <tr key={shelf.shelf_id}>
                  <td>{shelf.shelf_id}</td>
                  <td>{shelf.shelf_name}</td>
                  <td>{shelf.date_added}</td>
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

      <Users />
    </div>
  )
}

export default ShelvesList
