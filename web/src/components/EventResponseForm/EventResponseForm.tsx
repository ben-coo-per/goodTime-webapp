import { useAuth } from '@redwoodjs/auth'
import { Form } from '@redwoodjs/forms'
import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useState } from 'react'
import ResponseCalendarInput from '../CalendarInputs/ResponseCalendarInput/ResponseCalendarInput'

export interface ProvidedTimes
  extends Pick<TimeRange, 'startTime' | 'endTime' | 'id'> {
  user: Pick<User, 'displayName' | 'phoneNumber'>
}

const CREATE_TIME_RANGES = gql`
  mutation CreateTimeRange($id: Int!, $input: [CreateTimeRangeInput!]!) {
    addTimesToEvent(id: $id, input: $input) {
      id
      userId
    }
  }
`

const EventResponseForm = ({ times }: { times: ProvidedTimes[] }) => {
  const [timeRanges, setTimeRanges] = useState([])
  const { currentUser } = useAuth()
  const { id } = useParams()

  const [createTimeRanges, { loading }] = useMutation(CREATE_TIME_RANGES, {
    onCompleted: (event) => {
      toast.success('Available times saved!!')
      // navigate(routes.shareEvent({ id: event.createEventWithTimes.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  function onSubmit() {
    const data = timeRanges.map((d) => ({
      ...d,
      eventId: id,
      userId: currentUser.id,
    }))
    createTimeRanges({
      variables: {
        input: data,
      },
    })
  }
  return (
    <Form onSubmit={onSubmit}>
      <ResponseCalendarInput
        times={times}
        setTimeRanges={setTimeRanges}
        timeRanges={timeRanges}
      />
    </Form>
  )
}

export default EventResponseForm
