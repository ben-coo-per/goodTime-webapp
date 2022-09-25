import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  FieldError,
  PasswordField,
} from '@redwoodjs/forms'
import { navigate, routes, useLocation } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import { Mixpanel } from 'src/utils/mixPanel'

const UPDATE_TIME_RANGE = gql`
  mutation updateTimeRange($id: Int!, $input: UpdateTimeRangeInput!) {
    updateTimeRange(id: $id, input: $input) {
      id
    }
  }
`

const SignUpAfterResponsePage = () => {
  const { getCurrentUser, signUp, loading: authLoading } = useAuth()

  const { search } = useLocation()
  const { defaultDisplayName, associatedTimeRanges } = getQueryParams(search)

  const [updateTimeRange, { loading: trUpdateLoading }] = useMutation(
    UPDATE_TIME_RANGE,
    {
      onCompleted: () => {
        Mixpanel.track('times successfully associated with new account')
        navigate(routes.home())
      },
    }
  )

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    await signUp({ ...data }).then(async () => {
      try {
        await getCurrentUser().then((user) => {
          associatedTimeRanges.forEach((timeRangeId) => {
            updateTimeRange({
              variables: {
                id: timeRangeId,
                input: { userId: user.id },
              },
            })
          })
        })
      } catch (err) {
        toast.error(err)
        Mixpanel.track('could not associate timeranges with new account', {
          error: err,
        })
      }
    })

    if (response.message) {
      toast(response.message)
      Mixpanel.track('signup action after event response', {
        message: response.message,
      })
    } else if (response.error) {
      toast.error(response.error)
      Mixpanel.track('unsuccessful signup after event response', {
        error: response.error,
      })
    }
  }

  return (
    <>
      <MetaTags
        title="Sign Up"
        description="Create an account (but its okay if you've already responded to the event"
      />

      <main>
        <Toaster toastOptions={{ duration: 6000 }} />
        <div>
          <div>
            <header>
              <h2 className="text-center font-display text-3xl lowercase">
                Create an account
              </h2>
              <p className="px-10 text-center font-sans">
                to keep track of events you have responded to or create your own
                events in the future
              </p>
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
                  name="name"
                  className="label mb-2"
                  errorClassName="label mb-2 error"
                >
                  Name (optional)
                </Label>
                <TextField
                  name="name"
                  className="input mb-8"
                  defaultValue={defaultDisplayName}
                />

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

                <Button type="submit" loading={authLoading || trUpdateLoading}>
                  Sign Up
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignUpAfterResponsePage

function getQueryParams(qpString: string) {
  let defaultDisplayName = ''
  let associatedTimeRanges = []
  try {
    defaultDisplayName = decodeURI(qpString.match(/displayName=(.*)&/)[1])
    associatedTimeRanges = qpString
      .match(/&trs=(.*)/)[1]
      .split(',')
      .map((tId: string) => parseInt(tId))
  } catch (e) {
    console.log(e)
  }
  return { defaultDisplayName, associatedTimeRanges }
}
