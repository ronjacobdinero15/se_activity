import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../services/apiAuth'
import { useState } from 'react'
import toast from 'react-hot-toast'

function Register() {
  const { register, formState, handleSubmit, reset } = useForm()
  const { errors } = formState
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newUser }) => registerUser(newUser),
    onSuccess: data => {
      if (data.success) {
        toast.success(`${data.message}`)
        navigate('/login')
      } else {
        toast.error(`${data.message}`)

        setMessage(data.message)
      }
    },
    onError: err => toast.error(err.message),
  })

  function onSubmit({
    username,
    password,
    email,
    first_name,
    last_name,
    address,
    age,
  }) {
    mutate(
      {
        newUser: {
          username,
          password,
          email,
          first_name,
          last_name,
          address,
          age,
        },
      },
      { onSettled: () => reset }
    )
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h3 className="mb-4">Register here!</h3>

      {message && <p className="text-danger">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="w-75">
        {/* Repeat for each form field */}
        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
          </div>
          <div className="col-4">
            <input
              type="text"
              id="username"
              className="form-control"
              disabled={isLoading}
              {...register('username', { required: 'This field is required' })}
            />
          </div>
          <div className="col-4">
            {errors.username && (
              <p className="text-danger">{errors.username.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
          </div>
          <div className="col-4">
            <input
              type="password"
              id="password"
              className="form-control"
              disabled={isLoading}
              {...register('password', {
                required: 'This field is required',
                minLength: {
                  value: 8,
                  message: 'Password needs a minimum of 8 characters',
                },
              })}
            />
          </div>
          <div className="col-4">
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password:
            </label>
          </div>
          <div className="col-4">
            <input
              type="password"
              id="passwordConfirm"
              className="form-control"
              disabled={isLoading}
              {...register('passwordConfirm', {
                required: 'This field is required',
                validate: (value, fieldValues) =>
                  value === fieldValues.password || 'Passwords must match',
              })}
            />
          </div>
          <div className="col-4">
            {errors.passwordConfirm && (
              <p className="text-danger">{errors.passwordConfirm.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
          </div>
          <div className="col-4">
            <input
              type="email"
              id="email"
              className="form-control"
              disabled={isLoading}
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please provide a valid email address',
                },
              })}
            />
          </div>
          <div className="col-4">
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="first_name" className="form-label">
              First Name:
            </label>
          </div>
          <div className="col-4">
            <input
              type="text"
              id="first_name"
              className="form-control"
              disabled={isLoading}
              {...register('first_name', {
                required: 'This field is required',
              })}
            />
          </div>
          <div className="col-4">
            {errors.first_name && (
              <p className="text-danger">{errors.first_name.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="last_name" className="form-label">
              Last Name:
            </label>
          </div>
          <div className="col-4">
            <input
              type="text"
              id="last_name"
              className="form-control"
              disabled={isLoading}
              {...register('last_name', { required: 'This field is required' })}
            />
          </div>
          <div className="col-4">
            {errors.last_name && (
              <p className="text-danger">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="address" className="form-label">
              Address:
            </label>
          </div>
          <div className="col-4">
            <input
              type="text"
              id="address"
              className="form-control"
              disabled={isLoading}
              {...register('address', { required: 'This field is required' })}
            />
          </div>
          <div className="col-4">
            {errors.address && (
              <p className="text-danger">{errors.address.message}</p>
            )}
          </div>
        </div>

        <div className="row mb-3 align-items-center">
          <div className="col-4">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
          </div>
          <div className="col-4">
            <input
              type="number"
              id="age"
              className="form-control"
              disabled={isLoading}
              {...register('age', { required: 'This field is required' })}
            />
          </div>
          <div className="col-4">
            {errors.age && <p className="text-danger">{errors.age.message}</p>}
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-3"
          >
            Register
          </button>

          <button type="reset" className="btn btn-warning mt-3">
            Reset
          </button>
        </div>
      </form>

      <div className="mt-3">
        <Link to="/login">Already have an account? Login instead</Link>
      </div>
    </div>
  )
}

export default Register
