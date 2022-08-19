import { useEffect, useRef } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/input/Button/Button'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
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

              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
