import { Link, useNavigate, useParams } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { deleteItem, getShelfData } from '../services/apiShelves'
import toast from 'react-hot-toast'
import Spinner from '../ui/Spinner'

function ShelfList() {
  const { shelf_id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const current_user = JSON.parse(sessionStorage.getItem('user'))

  const {
    data: items = [],
    status,
    isLoading,
  } = useQuery({
    queryKey: ['shelfItems', shelf_id],
    queryFn: () => getShelfData(shelf_id, 'shelf_data'),
  })

  const { mutate } = useMutation({
    mutationFn: item_id => deleteItem(item_id),
    onSuccess: () => {
      toast.success(`Item deleted successfully`)
      queryClient.invalidateQueries(['shelfItems', shelf_id])
    },
  })

  if (status === 'success') {
    queryClient.invalidateQueries({ active: true })
  }

  if (isLoading) return <Spinner />

  if (status === 'error') return <div>Error fetching items.</div>

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-md-6">
            <b>Inventory</b>
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              Go back
            </button>
            <Link
              to={`/addItem/shelf/${shelf_id}`}
              className="btn btn-success btn-sm float-end"
            >
              Add
            </Link>
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Items</th>
              <th>Price</th>
              <th>Shelf ID</th>
              <th>Date Added</th>
              <th>Added By</th>
              <th>Last Updated</th>
              <th>Updated By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(shelf => (
              <tr key={shelf.item_id}>
                <td>{shelf.item_id}</td>
                <td>{shelf.item_name}</td>
                <td>₱{shelf.price}</td>
                <td>{shelf.shelf_id}</td>
                <td>{shelf.date_added}</td>
                <td>
                  <Link to={`/user/${current_user.user_id}`}>
                    {shelf.added_by}
                  </Link>
                </td>
                <td>{shelf.last_updated}</td>
                <td>{shelf.updated_by}</td>
                <td className="flex justify-content-between">
                  <div>
                    <Link
                      to={`/edit/item/${shelf.item_id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    &nbsp;
                    <button
                      type="button"
                      onClick={() => mutate(shelf.item_id)}
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

export default ShelfList
