import { Link } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deleteShelve, getShelves } from '../services/apiShelves'

function ShelvesList() {
  const queryClient = useQueryClient()

  const { data: shelves = [], status } = useQuery({
    queryKey: ['shelves'],
    queryFn: getShelves,
  })

  if (status === 'success') {
    queryClient.invalidateQueries({ active: true })
  }

  const { mutate } = useMutation({
    mutationFn: id => deleteShelve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ active: true })
    },
  })

  if (status === 'loading') return <div>Loading...</div>

  return (
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
                      onClick={() => mutate(shelf.shelf_id)}
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
  )
}

export default ShelvesList
