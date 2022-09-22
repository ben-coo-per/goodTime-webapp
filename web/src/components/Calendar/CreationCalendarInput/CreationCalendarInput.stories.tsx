import { useState } from 'react'

import { SelectedTimeRange } from 'src/pages/CreateEventPage/CreateEventPage'

import CalendarSelectionInput from './CreationCalendarInput'

export const Default = () => {
  const [timeRanges, setTimeRanges] = useState<SelectedTimeRange[]>([])
  return (
    <div className="container mx-auto px-96">
      <CalendarSelectionInput
        timeRanges={timeRanges}
        setTimeRanges={setTimeRanges}
      />
    </div>
  )
}

export default { title: 'Components/Calendars/CalendarSelectionInput' }
