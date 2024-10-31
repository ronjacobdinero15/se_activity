import { Link, useNavigate } from 'react-router-dom'

function UserList({ user }) {
  const { username } = user

  return (
    <li className="list-group-item">
      <Link to={`/user/${user.user_id}`}>{username}</Link>
    </li>
  )
}

export default UserList
