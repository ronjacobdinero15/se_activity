import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/apiAuth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ user, action }) => login({ user, action }),
    onSuccess: data => {
      if (data.success) {
        navigate('/dashboard')
        sessionStorage.setItem('username', data.username)
      } else {
        setMessage(data.message)
        setUsername('')
        setPassword('')
      }
    },
  })

  function handleSubmit(e) {
    e.preventDefault()

    if (!username || !password) {
      setUsername('')
      setPassword('')
      setMessage('Make sure input fields are correct')

      return
    }

    mutate({ user: { username, password }, action: 'login' })
  }

  return (
    <div className="">
      <h2>Login</h2>
      {<p>{message}</p>}
      <form method="POST" onSubmit={handleSubmit} className="w-25">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
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
            autoComplete="current-password"
            className="form-control"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setMessage('')
            }}
          />
        </div>
        <input
          type="submit"
          name="loginUserBtn"
          className="btn btn-primary mt-3"
          value="Login"
        />

        <Link to="/register">Register</Link>
      </form>
    </div>
  )
}

export default Login
