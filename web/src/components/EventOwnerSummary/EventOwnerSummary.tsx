import { colorGenerator } from 'src/utils/colorGenerator'

import GroupAvailabilityCalendar from '../Calendar/GroupAvailabilityCalendar/GroupAvailabilityCalendar'
import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'

const EventOwnerSummary = ({
  times,
  baseTimes,
  title,
}: {
  times: ProvidedTimes[]
  baseTimes: ProvidedTimes[]
  title: string
}) => {
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index
  }
  const listOfUsers = times.map((t) => t.user).filter(onlyUnique)

  // Assign a color to each user
  const listOfColors = colorGenerator({
    numColors: listOfUsers.length,
    prefix: 'bg',
  })
  times = times.map((time) => ({
    ...time,
    user: { ...time.user, color: listOfColors[listOfUsers.indexOf(time.user)] },
  }))

  return (
    <div className="flex h-full flex-1 flex-col">
      <h1 className="mb-2 font-display text-2xl tracking-wider dark:text-light-gray">
        {title}
      </h1>
      <h3 className="mb-2 font-sans text-lg lowercase dark:text-light-gray">
        Your group&apos;s available times
      </h3>
      <div className=" h-full overflow-auto">
        <GroupAvailabilityCalendar
          baseTimes={baseTimes}
          allTimes={times}
          numberOfUsers={listOfUsers.length}
        />
      </div>
    </div>
  )
}

export default EventOwnerSummary
