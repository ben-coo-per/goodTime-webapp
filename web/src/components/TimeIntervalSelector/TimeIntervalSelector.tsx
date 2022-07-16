import { Dispatch, SetStateAction } from 'react'

import { TimeIncrement } from '../CalendarSelectionInput/CalendarSelectionInput'

interface TimeIntervalSelectorProps {
  timeIncrement: number
  setTimeIncrement: Dispatch<SetStateAction<TimeIncrement>>
}

const TimeIntervalSelector = ({
  timeIncrement,
  setTimeIncrement,
}: TimeIntervalSelectorProps) => {
  function timeIncToRange(time) {
    switch (time) {
      case 60:
        return '1'
      case 30:
        return '2'
      case 15:
        return '3'
    }
  }

  return (
    <div>
      <p className="text-xs">Time Increment:</p>
      <input
        type="range"
        min={1}
        max={3}
        value={timeIncToRange(timeIncrement)}
        onChange={(e) => {
          console.log(e.target.value)
          switch (e.target.value) {
            case '1':
              setTimeIncrement(60)
              break
            case '2':
              setTimeIncrement(30)
              break
            case '3':
              setTimeIncrement(15)
              break
          }
        }}
      />
    </div>
  )
}

export default TimeIntervalSelector
