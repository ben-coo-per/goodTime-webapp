import { useEffect, useState } from 'react'

import { TimeRange, User } from 'types/graphql'

import { Form } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

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
      }
    }
  }
`

const EventResponseForm = ({ times }: { times: ProvidedTimes[] }) => {
  const [timeRanges, setTimeRanges] = useState([])
  const [hasChanged, setHasChanged] = useState<boolean | undefined>()
  const { id } = useParams()

  useEffect(() => {
    if (hasChanged == undefined) {
      setHasChanged(false)
    } else {
      setHasChanged(true)
    }
  }, [hasChanged, timeRanges])

  const [createTimeRanges, { loading }] = useMutation(CREATE_TIME_RANGES, {
    onCompleted: () => {
      toast.success('Your available times have been saved!')
    },
    onError: (error) => {
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
      <h1 className="mb-2 font-display text-2xl lowercase">
        What times work for you?
      </h1>
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
