import type { FindEventQuery, FindEventQueryVariables } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Button from '../Button/Button'
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

export const Empty = () => (
  <div className="flex flex-col gap-4">
    <p className="font-display text-3xl lowercase">Oops!</p>
    <p className="">We can&apos;t seem to find the event you are looking for</p>
    <Link to={routes.home()}>
      <Button>Back Home</Button>
    </Link>
  </div>
)

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
    (time) => time.user?.id === event.owner.id
  )

  if (event.owner.id === currentUser?.id) {
    // if user is event owner, redirect to summary page.
    return (
      <EventOwnerSummary
        times={event.times.filter((time) => time.user.id != event.owner.id)}
        title={event.name}
        baseTimes={ownerSelectedTimes}
      />
    )
  }

  if (
    currentUser &&
    event.times.map((t) => t.user?.id).includes(currentUser?.id)
  ) {
    // if user is event guest who has voted, show response table with thier existing times & option to switch to edit mode.
    return (
      <EventResponseReview
        times={ownerSelectedTimes}
        title={event.name}
        selectedTimes={event.times.filter((t) => t.user.id === currentUser.id)}
      />
    )
  }

  return (
    // if user is event guest who hasn't voted, show response input.
    <EventResponseForm times={ownerSelectedTimes} title={event.name} />
  )
}
