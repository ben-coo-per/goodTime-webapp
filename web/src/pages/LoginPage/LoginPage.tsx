import { useRef, useState } from 'react'
import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  PasswordField,
  FieldError,
  TelField,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { Mixpanel } from 'src/utils/mixPanel'

const LoginPage = () => {
  const {
    isAuthenticated,
    currentUser,
    logIn,
    loading: authLoading,
  } = useAuth()
  const { search } = useLocation()
  const continueYourJourney = search.replace('?redirectTo=', '')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true)
      Mixpanel.identify(currentUser.id)
      Mixpanel.people.set({
        $name: currentUser.displayName,
        $phoneNumber: currentUser.phoneNumber,
      })
      if (/redirectTo=.+$/.test(search)) {
        navigate(continueYourJourney)
      } else {
        navigate(routes.home())
      }
    }
  }, [continueYourJourney, isAuthenticated, search, currentUser])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    const loadingToast = toast.loading('Loading...')

    if (response.message) {
      toast.remove(loadingToast)
      Mixpanel.track('login action', { message: response.message })
      toast(response.message)
    } else if (response.error) {
      toast.remove(loadingToast)
      toast.error(response.error)
      Mixpanel.track('unsuccessful login', { error: response.error })
    } else {
      toast.remove(loadingToast)
      toast.success('Welcome back!')
      Mixpanel.track('successful login')
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <main>
        <Toaster toastOptions={{ duration: 6000 }} />
        <div>
          <div>
            <header>
              <h2 className="text-center font-display text-3xl lowercase">
                Log In
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
                <TelField
                  name="username"
                  className="input mb-8"
                  errorClassName="input error mb-1"
                  ref={usernameRef}
                  validation={{
                    pattern: {
                      value: /^[0-9]{10}$/i,
                      message: 'Please enter a valid phone number',
                    },
                    required: {
                      value: true,
                      message: 'Phone Number is required',
                    },
                  }}
                />
                <FieldError name="username" className="field-error mb-8" />

                <Label
                  name="password"
                  className="label"
                  errorClassName="label error"
                >
                  Password
                </Label>
                <PasswordField
                  name="password"
                  className="input mb-1"
                  errorClassName="input error mb-1"
                  autoComplete="current-password"
                  validation={{
                    required: {
                      value: true,
                      message: 'Password is required',
                    },
                  }}
                />
                <FieldError name="password" className="field-error" />
                <div className="mb-8 w-full text-end">
                  <Link
                    to={routes.forgotPassword()}
                    className="text-sm text-text-subtle hover:text-teal-700 dark:text-light-gray"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button type="submit" loading={loading || authLoading}>
                  Log In
                </Button>
              </Form>
            </div>
          </div>
          <div className="text-center">
            <span>{`Don't have an account?`}</span>{' '}
            <Link
              to={routes.signup({ redirectTo: continueYourJourney })}
              className="text-blue-700 underline dark:text-blue-400"
            >
              Sign up!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default LoginPage
