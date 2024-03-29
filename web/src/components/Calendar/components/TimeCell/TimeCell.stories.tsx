import { useState } from 'react'

import moment from 'moment'

import { SelectedTimeRange } from 'src/pages/CreateEventPage/CreateEventPage'

import TimeCell from './TimeCell'

export const Default = () => {
  const now = moment()
  const [timeRanges, setTimeRanges] = useState<SelectedTimeRange[]>([])

  const handleSelectTime = () => {
    const fakeTimeRange = { startTime: now.unix() - 1, endTime: now.unix() + 1 }
    setTimeRanges([fakeTimeRange])
  }

  return (
    <div
      data-testid="calendar-table"
      className="flexbox-table hidden-scrollbar::-webkit-scrollbar hidden-scrollbar h-96 w-40 overflow-y-auto"
    >
      <div data-testid="calendar-table-column" className="col">
        <TimeCell
          time={now}
          timeRanges={timeRanges}
          handleSelectTime={handleSelectTime}
          handleDeselectTime={() => setTimeRanges([])}
        />
      </div>
    </div>
  )
}

export default { title: 'Components/Calendars/Components/TimeCell' }
