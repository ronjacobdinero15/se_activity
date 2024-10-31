import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/apiAuth'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ newUser, action }) => registerUser({ newUser, action }),
    onSuccess: data => {
      if (data) navigate('/login')
    },
    onError: error => console.log(error.message),
  })

  function handleSubmit(e) {
    e.preventDefault()

    if (!username || !password) {
      setUsername('')
      setPassword('')

      return
    }

    mutate({ newUser: { username, password }, action: 'register' })
  }

  return (
    <>
      <h2>Register here!</h2>
      <form method="POST" onSubmit={handleSubmit} className="w-25">
        {message && <p>{message}</p>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={username}
            onChange={e => {
              setUsername(e.target.value)
              setMessage('')
            }}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setMessage('')
            }}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <input
            type="submit"
            name="registerUserBtn"
            className="btn btn-primary mt-3"
            value="Register"
          />

          <Link to="/login">Login instead</Link>
        </div>
      </form>
    </>
  )
}

export default Register
