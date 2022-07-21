import { useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import CalendarSelectionInput from 'src/components/CalendarSelectionInput/CalendarSelectionInput'

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
    if (selectedTimeRanges.length > 0) {
      createEventWithTimes({
        variables: {
          eventInput: { name: data.eventName, userId: currentUser.id },
          timeInput: selectedTimeRanges,
        },
      })
    } else {
      toast.error('You must select at least one time')
    }
  }

  return (
    <>
      <MetaTags
        title="Event Create"
        description="Create an event to find out what times your friends are available"
      />
      <div className="h-full flex flex-col">
        <Form
          onSubmit={onSubmit}
          className="flex-1 flex flex-col h-full rounded sm:px-20 py-8"
        >
          {formStep === 0 && (
            <>
              <h1 className="text-2xl font-display lowercase mb-2">
                What’s the name of your event?
              </h1>
              <TextField
                name="eventName"
                className="input"
                errorClassName="input error"
                validation={{ required: true }}
              />
            </>
          )}
          {formStep === 1 && (
            <>
              <h1 className="text-2xl font-display lowercase mb-2">
                Let’s add some times that work for you.
              </h1>
              <CalendarSelectionInput
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
              type={formStep < 1 ? 'button' : 'submit'}
              disabled={loading}
              additionalClasses="mt-2"
              onClick={formStep < 1 ? () => setFormStep(formStep + 1) : null}
            >
              Next
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default EventCreatePage
