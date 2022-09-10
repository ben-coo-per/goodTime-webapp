import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import EventOwnerSummary from '../EventOwnerSummary/EventOwnerSummary'
import EventResponseForm from '../EventResponseForm/EventResponseForm'
import EventResponseReview from '../EventResponseReview/EventResponseReview'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

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

export const Loading = () => <LoadingIndicator />

export const Empty = () => <LoadingIndicator />

export const Failure = ({
  error,
}: CellFailureProps<FindEventQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  event,
}: CellSuccessProps<FindEventQuery, FindEventQueryVariables>) => {
  const { currentUser } = useAuth()
  const ownerSelectedTimes = event.times.filter(
    (time) => time.user.id === event.owner.id
  )

  if (event.owner.id === currentUser?.id) {
    // if user is event owner, redirect to summary page.
    return (
      <EventOwnerSummary
        times={event.times.filter((time) => time.user.id != event.owner.id)}
        baseTimes={ownerSelectedTimes}
      />
    )
  }

  if (event.times.map((t) => t.user.id).includes(currentUser.id)) {
    // if user is event guest who has voted, show response table with thier existing times & option to switch to edit mode.
    return (
      <EventResponseReview
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
