import type { Event, EventsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindEventQuery($userId: String, $selectPastEvents: Boolean) {
    events: events(userId: $userId, selectPastEvents: $selectPastEvents) {
      id
      createdAt
      name
      times {
        startTime
        endTime
        userId
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ events }: CellSuccessProps<EventsQuery>) => {
  return (
    <div className="flex flex-col gap-8">
      {events.map((event) => {
        // return <li key={event.id}>{JSON.stringify(event)}</li>
        return <EventDisplayBlock key={event.id} event={event} />
      })}
    </div>
  )
}

const EventDisplayBlock = ({ event }: { event: Event }) => {
  return (
    <div className="h-20 w-full border border-indigo-300">
      <h3>{event.name}</h3>
    </div>
  )
}
