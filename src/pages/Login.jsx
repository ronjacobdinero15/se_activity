import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginApi } from '../services/apiAuth'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Login() {
  const { register, formState, handleSubmit } = useForm()
  const { errors } = formState
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const { mutate: login } = useMutation({
    mutationFn: ({ user }) => loginApi(user),
    onSuccess: data => {
      if (data.success) {
        toast.success(`${data.username} successfully logged in`)
        navigate('/dashboard')
        sessionStorage.setItem(
          'user',
          JSON.stringify({ username: data.username, user_id: data.id })
        )

        return
      }
      setMessage(data.message)
    },
    onError: err => toast.error(err.message),
  })

  function onSubmit({ username, password }) {
    login({ user: { username, password } })
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="h3">Login</h3>

      {message && <p className="text-danger">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="w-25">
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            autoComplete="username"
            className="form-control"
            {...register('username', { required: 'This field is required' })}
          />
          {errors && <p className="text-danger">{errors?.username?.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="current-password"
            className="form-control"
            name="password"
            {...register('password', { required: 'This field is required' })}
          />
          {errors && <p className="text-danger">{errors?.password?.message}</p>}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="submit"
            name="loginUserBtn"
            className="btn btn-primary mt-3"
            value="Login"
          />
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
