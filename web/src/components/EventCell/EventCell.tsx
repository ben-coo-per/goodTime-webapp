import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useState } from 'react'
import ResponseCalendarInput from '../CalendarInputs/ResponseCalendarInput/ResponseCalendarInput'
import { useAuth } from '@redwoodjs/auth'
import EventResponseForm from '../EventResponseForm/EventResponseForm'
import moment from 'moment'

export const QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      createdAt
      id
      name
      owner {
        id
      }
      times {
        id
        startTime
        endTime
        user {
          id
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
  const { isAuthenticated, loading, currentUser } = useAuth()
  const ownerSelectedTimes = event.times.filter(
    (time) => time.user.id === event.owner.id
  )
  // todo: handle permissions view
  // --> if user is event owner, show summary of responses.
  // --> if user is event guest who hasn't voted, show response table.
  // --> if user is event guest who has voted, show response table with thier existing times & option to switch to edit mode.
  if (event.times.map((t) => t.user.id).includes(currentUser.id)) {
    return (
      <div className="flex h-full flex-1 flex-col">
        <h1 className="mb-2 font-display text-2xl lowercase">
          Here are the times you said you're available:
        </h1>
        <div className=" h-full overflow-auto">
          <EventResponseForm times={ownerSelectedTimes} />
        </div>
      </div>
    )
  }

  if (event.owner.id === currentUser?.id) {
    // return <div>Summary</div>
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl lowercase">
        What times work for you?
      </h1>
      <div className=" h-full overflow-auto">
        <EventResponseForm times={ownerSelectedTimes} />
      </div>
    </div>
  )
}
