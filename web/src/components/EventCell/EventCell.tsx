import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import EventResponseForm from '../EventResponseForm/EventResponseForm'
import EventResponseSummary from '../EventResponseSummary/EventResponseSummary'
import EventOwnerSummary from '../EventOwnerSummary/EventOwnerSummary'

export const QUERY = gql`
  query FindEventQuery($id: Int!) {
    event: event(id: $id) {
      createdAt
      id
      name
      owner {
        id
        displayName
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

  if (event.owner.id === currentUser?.id) {
    // if user is event owner, redirect to summary page.
    return <EventOwnerSummary times={event.times} />
  }

  if (event.times.map((t) => t.user.id).includes(currentUser.id)) {
    // if user is event guest who has voted, show response table with thier existing times & option to switch to edit mode.
    return (
      <EventResponseSummary
        times={ownerSelectedTimes}
        selectedTimes={event.times.filter((t) => t.user.id === currentUser.id)}
      />
    )
  }

  return (
    // if user is event guest who hasn't voted, show response input.
    <EventResponseForm times={ownerSelectedTimes} />
  )
}
