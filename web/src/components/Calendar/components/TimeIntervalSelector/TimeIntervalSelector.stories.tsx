import { useState } from 'react'

import { TimeIncrement } from '../../CreationCalendarInput/CreationCalendarInput'

import TimeIntervalSelector from './TimeIntervalSelector'

export const Default = () => {
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)
  return (
    <TimeIntervalSelector
      timeIncrement={timeIncrement}
      setTimeIncrement={setTimeIncrement}
    />
  )
}

export default { title: 'Components/Calendars/Components/TimeIntervalSelector' }
