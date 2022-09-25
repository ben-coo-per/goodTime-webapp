import { useEffect, useState } from 'react'

import { TimeRange, User } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { Mixpanel } from 'src/utils/mixPanel'

import ResponseCalendarInput from '../Calendar/ResponseCalendarInput/ResponseCalendarInput'

export interface ProvidedTimes
  extends Pick<TimeRange, 'startTime' | 'endTime' | 'id'> {
  user: Pick<User, 'displayName' | 'phoneNumber' | 'id'>
}

const CREATE_TIME_RANGES = gql`
  mutation CreateTimeRangeForEvent(
    $id: Int!
    $input: [CreateTimeRangeInputForEvent!]!
  ) {
    addTimesToEvent(id: $id, input: $input) {
      id
      times {
        id
        startTime
        endTime
        user {
          displayName
          phoneNumber
        }
      }
      owner {
        phoneNumber
      }
      name
    }
  }
`

const EventResponseForm = ({
  times,
  title,
}: {
  times: ProvidedTimes[]
  title: string
}) => {
  const [timeRanges, setTimeRanges] = useState([])
  const [hasChanged, setHasChanged] = useState<boolean | undefined>()
  const { id } = useParams()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (hasChanged == undefined) {
      setHasChanged(false)
    } else {
      setHasChanged(true)
    }
  }, [hasChanged, timeRanges])

  const [createTimeRanges, { loading }] = useMutation(CREATE_TIME_RANGES, {
    onCompleted: async (event) => {
      Mixpanel.track('respondant times successfully submitted')
      toast.success('Your available times have been saved!')

      const smsMsgReqBody = {
        eventId: event.addTimesToEvent.id,
        eventName: event.addTimesToEvent.name,
        phoneNumber: event.addTimesToEvent.owner.phoneNumber,
        user: currentUser.displayName || currentUser.phoneNumber,
        msgType: 'event-response',
      }
      await fetch(`../.netlify/functions/sendTwilioSms`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(smsMsgReqBody),
      })
    },
    onError: (error) => {
      Mixpanel.track('respondant time submission unsuccessful')
      toast.error(error.message)
    },
  })

  function onSubmit() {
    if (hasChanged) {
      createTimeRanges({
        variables: {
          id: id,
          input: timeRanges,
        },
      })
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl tracking-wider dark:text-light-gray">
        {title}
      </h1>
      <h3 className="mb-2 font-sans text-lg lowercase dark:text-light-gray">
        What times work for you?
      </h3>
      <Form onSubmit={onSubmit} className=" h-full overflow-auto">
        <ResponseCalendarInput
          times={times}
          setTimeRanges={setTimeRanges}
          timeRanges={timeRanges}
          isDisabled={!hasChanged}
          isLoading={loading}
        />
      </Form>
    </div>
  )
}

export default EventResponseForm
