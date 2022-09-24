import { useEffect, useState } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { Mixpanel } from 'src/utils/mixPanel'

import ResponseCalendarInput from '../Calendar/ResponseCalendarInput/ResponseCalendarInput'
import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'

const CLEAR_TIMES = gql`
  mutation DeleteTimeRanges($userId: String!, $eventId: Int!) {
    deleteTimeRanges(eventId: $eventId, userId: $userId)
  }
`

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

const EventResponseReview = ({
  times,
  selectedTimes,
}: {
  times: ProvidedTimes[]
  selectedTimes: ProvidedTimes[]
}) => {
  const [hasChanged, setHasChanged] = useState<boolean | undefined>()
  const [timeRanges, setTimeRanges] = useState(selectedTimes)
  const { id } = useParams()
  const { userMetadata, currentUser } = useAuth()
  const [clearTimes, { loading: deleteLoading }] = useMutation(CLEAR_TIMES, {
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [createTimeRanges, { loading: createLoading }] = useMutation(
    CREATE_TIME_RANGES,
    {
      onCompleted: async (event) => {
        toast.success('Your times have been updated!')
        Mixpanel.track('respondant times successfully updated')
        setHasChanged(false)
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
        toast.error(error.message)
        Mixpanel.track('respondant time update unsuccessful')
      },
    }
  )

  const loading: boolean = createLoading || deleteLoading

  useEffect(() => {
    if (hasChanged == undefined) {
      setHasChanged(false)
    } else {
      setHasChanged(true)
    }
  }, [hasChanged, timeRanges])

  async function onSubmit() {
    if (hasChanged) {
      // destroy exisitng records and recreate with new times
      clearTimes({
        variables: {
          eventId: id,
          userId: userMetadata,
        },
      })
      createTimeRanges({
        variables: {
          id: id,
          input: timeRanges.map((tr) => ({
            startTime: tr.startTime,
            endTime: tr.endTime,
          })),
        },
      })
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl lowercase">
        Here are the times you said you&apos;re available:
      </h1>
      <Form onSubmit={onSubmit} className="h-full overflow-auto">
        <ResponseCalendarInput
          times={times}
          setTimeRanges={setTimeRanges}
          timeRanges={timeRanges}
          isDisabled={loading || !hasChanged}
          isSummary={true}
        />
      </Form>
    </div>
  )
}

export default EventResponseReview
