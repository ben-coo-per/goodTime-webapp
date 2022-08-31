import { useRef } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'

const SignupPage = () => {
  const { isAuthenticated, signUp, loading } = useAuth()
  const { search } = useLocation()
  const continueYourJourney = search.replace('?redirectTo=', '')

  useEffect(() => {
    if (isAuthenticated) {
      if (/redirectTo=.+$/.test(search)) {
        navigate(continueYourJourney)
      } else {
        navigate(routes.home())
      }
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })
    const loadingToast = toast.loading("dotting the I's, crossing the T's...")

    if (response.message) {
      toast.remove(loadingToast)
      toast(response.message)
    } else if (response.error) {
      toast.remove(loadingToast)
      toast.error(response.error)
    } else {
      toast.remove(loadingToast)
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <main>
        <Toaster toastOptions={{ duration: 6000 }} />
        <div>
          <div>
            <header>
              <h2 className="text-center font-display text-3xl lowercase">
                Signup
              </h2>
            </header>

            <div className="my-4 rounded-lg bg-white p-8 shadow dark:bg-indigo-800">
              <Form onSubmit={onSubmit} className="flex flex-col">
                <Label
                  name="username"
                  className="label mb-2"
                  errorClassName="label mb-2 error"
                >
                  Phone Number
                </Label>
                <TextField
                  name="username"
                  className="input mb-8"
                  errorClassName="input error mb-1"
                  ref={usernameRef}
                  validation={{
                    required: {
                      value: true,
                      message: 'Phone Number is required',
                    },
                  }}
                />
                <FieldError name="username" className="field-error mb-8" />

                <Label
                  name="name"
                  className="label mb-2"
                  errorClassName="label mb-2 error"
                >
                  Name (optional)
                </Label>
                <TextField name="name" className="input mb-8" />

                <Label
                  name="password"
                  className="label"
                  errorClassName="label error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="input mb-8"
                  errorClassName="input error mb-1"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="field-error mb-8" />

                <Button type="submit" disabled={loading}>
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
          <div className="text-center">
            <span>Already have an account?</span>{' '}
            <Link
              to={routes.login()}
              className="text-blue-700 underline dark:text-blue-400"
            >
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
