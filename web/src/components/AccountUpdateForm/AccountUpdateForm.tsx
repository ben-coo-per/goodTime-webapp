import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { useForm, Form, Label, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { Mixpanel } from 'src/utils/mixPanel'

import Button from '../Button/Button'
import ToggleInputField from '../input/ToggleInputField/ToggleInputField'

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      phoneNumber
      displayName
    }
  }
`

const AccountUpdateForm = () => {
  const { currentUser, loading: authLoading } = useAuth()
  const formMethods = useForm({
    defaultValues: {
      ...currentUser,
      allowTracking: true,
    },
  })
  const hasOptedInTracking = Mixpanel.get_tracking_state()

  const [updateUser, { loading: updateLoading }] = useMutation(
    UPDATE_USER_MUTATION,
    {
      onCompleted: (event) => {
        toast.success(`Your profile was successfully updated`)
        Mixpanel.track('account update successful', { event })
        formMethods.reset()
        formMethods.setValue('phoneNumber', event.updateUser.phoneNumber)
        formMethods.setValue('displayName', event.updateUser.displayName)
      },
      onError: (error) => {
        toast.error(error.message)
        Mixpanel.track('account update unsuccessful', { error: error.message })
      },
    }
  )

  useEffect(() => {
    if (currentUser != null && currentUser) {
      formMethods.setValue('phoneNumber', currentUser.phoneNumber)
      formMethods.setValue('displayName', currentUser.displayName)
      formMethods.setValue('allowTracking', hasOptedInTracking)
    }
  }, [authLoading, currentUser, formMethods, hasOptedInTracking])

  function handleSubmit(data) {
    if (data.allowTracking && !hasOptedInTracking) {
      Mixpanel.opt_in_tracking()
    }
    if (!data.allowTracking && hasOptedInTracking) {
      Mixpanel.opt_out_tracking()
    }
    updateUser({
      variables: {
        id: currentUser.id,
        input: { phoneNumber: data.phoneNumber, displayName: data.displayName },
      },
    })
  }

  if (authLoading) {
    return (
      <div className="my-4 flex flex-col gap-2 rounded-xl bg-white p-8 shadow dark:bg-indigo-800"></div>
    )
  }

  return (
    <Form
      className="my-4 flex flex-col gap-2 rounded-xl bg-white p-8 shadow dark:bg-indigo-800"
      formMethods={formMethods}
      onSubmit={handleSubmit}
    >
      <h2 className="mb-4 font-display text-xl lowercase">Your Account</h2>

      <Label name="phoneNumber" className="label mt-8 opacity-60">
        phone number
      </Label>
      <TextField
        name="phoneNumber"
        className="input cursor-not-allowed opacity-60"
        disabled
      />

      <Label name="displayName" className="label mt-8 ">
        display name
      </Label>
      <TextField name="displayName" className="input" />

      <ToggleInputField label="allow activity tracking" name="allowTracking" />

      <Button
        type="submit"
        additionalClasses="mt-8 "
        disabled={!formMethods.formState.isDirty}
        loading={updateLoading}
      >
        Submit
      </Button>
    </Form>
  )
}

export default AccountUpdateForm
