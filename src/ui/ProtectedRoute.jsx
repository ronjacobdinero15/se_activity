import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const currentUser = sessionStorage.getItem('username')

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  return children
}

export default ProtectedRoute
