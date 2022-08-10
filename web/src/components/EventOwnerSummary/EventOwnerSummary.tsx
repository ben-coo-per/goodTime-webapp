import { useAuth } from '@redwoodjs/auth'
import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'

const EventOwnerSummary = ({
  times,
  baseTimes,
}: {
  times: ProvidedTimes[]
  baseTimes: ProvidedTimes[]
}) => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl lowercase">
        Your group's available times
      </h1>
      <div className=" h-full overflow-auto">
        {/* <EventResponseForm times={ownerSelectedTimes} /> */}
      </div>
    </div>
  )
}

export default EventOwnerSummary
