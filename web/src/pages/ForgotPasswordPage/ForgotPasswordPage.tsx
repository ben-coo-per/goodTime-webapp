import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { Mixpanel } from 'src/utils/mixPanel'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword, currentUser } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated) {
      Mixpanel.identify(currentUser.id)
      Mixpanel.people.set({
        $name: currentUser.displayName,
        $phoneNumber: currentUser.phoneNumber,
      })
      setLoading(true)
      navigate(routes.home())
    }
  }, [isAuthenticated, currentUser])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await forgotPassword(data.username)

    if (response.error) {
      setLoading(false)
      toast.error(response.error)
      Mixpanel.track('password reset linke sending unsuccessfuly', {
        error: response.error,
      })
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.phoneNumber
      )
      navigate(routes.login())
      Mixpanel.track('password reset link successfully sent')
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <main>
        <Toaster toastOptions={{ duration: 6000 }} />
        <div>
          <header>
            <h2 className="text-center font-display text-3xl lowercase">
              Forgot Password
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

              <Button type="submit" loading={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
