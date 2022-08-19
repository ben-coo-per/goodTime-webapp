import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import CreationCalendarInput from 'src/components/Calendar/CreationCalendarInput/CreationCalendarInput'

const CREATE_EVENT_MUTATION = gql`
  mutation createEventWithTimes(
    $eventInput: CreateEventInput!
    $timeInput: [CreateTimeRangeInputForEvent!]!
  ) {
    createEventWithTimes(eventInput: $eventInput, timeInput: $timeInput) {
      id
      name
    }
  }
`

export type SelectedTimeRange = {
  startTime: number
  endTime: number
}

const EventCreatePage = () => {
  const { currentUser } = useAuth()
  const [formStep, setFormStep] = useState<number>(0)
  const [selectedTimeRanges, setSelectedTimeRanges] = useState<
    SelectedTimeRange[]
  >([])

  const [createEventWithTimes, { loading }] = useMutation(
    CREATE_EVENT_MUTATION,
    {
      onCompleted: (event) => {
        toast.success('Event created!')
        navigate(routes.shareEvent({ id: event.createEventWithTimes.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  function onSubmit(data) {
    if (formStep < 1) {
      setFormStep(formStep + 1)
    } else {
      if (selectedTimeRanges.length > 0) {
        createEventWithTimes({
          variables: {
            eventInput: { name: data.eventName, ownerId: currentUser.id },
            timeInput: selectedTimeRanges,
          },
        })
      } else {
        toast.error('You must select at least one time')
      }
    }
  }

  return (
    <>
      <MetaTags
        title="Event Create"
        description="Create an event to find out what times your friends are available"
      />
      <div className="flex h-full flex-col">
        <Form
          onSubmit={onSubmit}
          className="flex h-full flex-1 flex-col rounded py-8 sm:px-20"
        >
          {formStep === 0 && (
            <>
              <h1 className="mb-2 font-display text-2xl lowercase">
                What’s the name of your event?
              </h1>
              <TextField
                name="eventName"
                className="input"
                errorClassName="input error"
                validation={{ required: 'You must give your event a name' }}
              />
              <FieldError name="eventName" className="field-error" />
            </>
          )}
          {formStep === 1 && (
            <>
              <h1 className="mb-2 font-display text-2xl lowercase">
                Let’s add some times that work for you.
              </h1>
              <CreationCalendarInput
                setTimeRanges={setSelectedTimeRanges}
                timeRanges={selectedTimeRanges}
              />
            </>
          )}
          <div
            className={
              formStep > 0
                ? 'flex flex-row justify-between'
                : 'flex flex-row-reverse justify-between'
            }
          >
            {formStep > 0 && (
              <Button
                size="lg"
                type="button"
                disabled={loading}
                additionalClasses="mt-2"
                variant="ghost"
                onClick={() => setFormStep(formStep - 1)}
              >
                Back
              </Button>
            )}
            <Button
              size="lg"
              type="submit"
              disabled={loading}
              additionalClasses="mt-2"
            >
              {formStep > 0 ? 'Create' : 'Next'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default EventCreatePage
