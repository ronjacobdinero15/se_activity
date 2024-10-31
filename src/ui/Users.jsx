import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllUsers } from '../services/apiUsers'
import UserList from './UserList'

function Users() {
  const queryClient = useQueryClient()
  const { data: users = [], usersStatus } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  })

  if (usersStatus === 'success') {
    queryClient.invalidateQueries({ active: true })
  }

  return (
    <div className="my-5">
      <h3>Users list:</h3>
      <ul className="list-group">
        {users.map(user => (
          <UserList key={user.user_id} user={user} />
        ))}
      </ul>
    </div>
  )
}

export default Users
