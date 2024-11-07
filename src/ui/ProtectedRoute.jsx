import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const current_user = JSON.parse(sessionStorage.getItem('user'))

  useEffect(() => {
    if (!current_user) {
      navigate('/login')
    }
  }, [current_user, navigate])

  return children
}

export default ProtectedRoute
