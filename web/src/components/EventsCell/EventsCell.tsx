import { ArrowRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
import type { Event, EventsQuery } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

export const QUERY = gql`
  query FindEventQuery($userId: String, $selectPastEvents: Boolean) {
    events: events(userId: $userId, selectPastEvents: $selectPastEvents) {
      id
      createdAt
      name
      owner {
        id
        displayName
      }
      times {
        startTime
        endTime
        userId
      }
    }
  }
`

export const Loading = () => (
  <div className="mt-20">
    <LoadingIndicator />
  </div>
)

export const Empty = () => <></>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="hidden-scrollbar::-webkit-scrollbar hidden-scrollbar mt-20 overflow-x-hidden overflow-y-scroll rounded-lg border border-light-gray bg-amber-50 dark:border-indigo-600 dark:bg-indigo-800 ">
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  </div>
)

export const Success = ({ events }: CellSuccessProps<EventsQuery>) => {
  const { isAuthenticated } = useAuth()
  return (
    <>
      {isAuthenticated && (
        <>
          <h2 className="mt-20 mb-2 text-left font-display text-xl lowercase">
            Upcoming Events
          </h2>
          <div className="hidden-scrollbar::-webkit-scrollbar hidden-scrollbar overflow-x-hidden overflow-y-scroll rounded-lg border border-light-gray bg-amber-50 dark:border-indigo-600 dark:bg-indigo-800 ">
            <div className="flex flex-col gap-2 divide-y divide-light-gray  dark:divide-indigo-600">
              {events.map((event) => {
                return <EventDisplayBlock key={event.id} event={event} />
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export const EventDisplayBlock = ({ event }: { event: Partial<Event> }) => {
  const { currentUser } = useAuth()
  const firstDayInEvent = event.times
    .map((timeRange) => timeRange.endTime)
    .sort((a, b) => a - b)[0]

  const numResponses = new Set(
    event.times.map((t) => t.userId).filter((uId) => uId != event.owner.id)
  ).size

  return (
    <Link
      to={routes.eventResponse({ id: event.id, back: true })}
      className="grid w-full grid-cols-7 place-items-center p-4"
    >
      <div className="col-span-6 grid w-full grid-rows-2 gap-1">
        <div className="flex flex-row gap-2">
          <h3 className="text-left text-lg">{event.name}</h3>
          <span className=" mb-2.5 self-end text-sm">
            {`created by ${
              event.owner.id == currentUser.id ? 'you' : event.owner.displayName
            }`}
          </span>
        </div>
        <div className="mt-2 grid grid-cols-2 text-left">
          <span className="">{moment.unix(firstDayInEvent).fromNow()}</span>
          <div data-testid="responses-count">
            <span className="mr-2">responses:</span>
            <span className="font-bold">{numResponses}</span>
          </div>
        </div>
      </div>
      <div className="justify-self-end">
        <ArrowRightIcon className="mr-1 h-8" />
      </div>
    </Link>
  )
}
