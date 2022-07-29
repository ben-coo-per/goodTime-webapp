import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useState } from 'react'
import ResponseCalendarInput from '../CalendarInputs/ResponseCalendarInput/ResponseCalendarInput'

export const QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      createdAt
      id
      name
      times {
        id
        startTime
        endTime
        user {
          displayName
          phoneNumber
        }
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindEventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventQuery, FindEventQueryVariables>) => {
  const [timeRanges, setTimeRanges] = useState([])
  console.log(timeRanges)
  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl lowercase">
        What times work for you?
      </h1>
      <div className=" h-full overflow-auto">
        <ResponseCalendarInput
          times={event.times}
          setTimeRanges={setTimeRanges}
          timeRanges={timeRanges}
        />
      </div>
    </div>
  )
}
