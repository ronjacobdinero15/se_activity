import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserByID } from '../services/apiUsers'

function User() {
  const { user_id } = useParams()
  const navigate = useNavigate()

  const { data: user_data = {}, status } = useQuery({
    queryKey: ['user', user_id],
    queryFn: () => getUserByID(user_id),
  })

  return (
    <div>
      <h5>
        Username: <span className="lead">{user_data.username}</span>
      </h5>
      <h5>
        Date added: <span className="lead">{user_data.date_added}</span>
      </h5>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  )
}

export default User
