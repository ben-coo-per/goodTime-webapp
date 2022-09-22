import { useEffect, useRef, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, PasswordField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { Mixpanel } from 'src/utils/mixPanel'

const ResetPasswordPage = ({ resetToken }) => {
  const {
    isAuthenticated,
    reauthenticate,
    validateResetToken,
    resetPassword,
    currentUser,
  } = useAuth()
  const [enabled, setEnabled] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      Mixpanel.identify(currentUser.id)
      Mixpanel.people.set({
        $name: currentUser.displayName,
        $phoneNumber: currentUser.phoneNumber,
      })
      setEnabled(false)
      setLoading(true)
      navigate(routes.home())
    }
  }, [isAuthenticated, currentUser])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async (data: { password: string }) => {
    setLoading(true)
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
      setLoading(false)
      Mixpanel.track('Password reset unsuccessful', { error: response.error })
    } else {
      toast.success('Password changed!')
      Mixpanel.track('Password reset successful')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />
      <main>
        <Toaster toastOptions={{ duration: 6000 }} />
        <div>
          <header>
            <h2 className="text-center font-display text-3xl lowercase">
              Reset Your Password
            </h2>
          </header>

          <div className="my-4 rounded-lg bg-white p-8 shadow dark:bg-indigo-800">
            <Form onSubmit={onSubmit} className="flex flex-col">
              <Label
                name="password"
                className="label mb-2"
                errorClassName="label mb-2 error"
              >
                New Password
              </Label>
              <PasswordField
                name="password"
                autoComplete="new-password"
                className="input mb-8"
                errorClassName="input error mb-1"
                disabled={!enabled}
                ref={passwordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                }}
              />

              <FieldError name="password" className="field-error mb-8" />
              <Button disabled={!enabled} type="submit" loading={loading}>
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </main>
    </>
  )
}

export default ResetPasswordPage
