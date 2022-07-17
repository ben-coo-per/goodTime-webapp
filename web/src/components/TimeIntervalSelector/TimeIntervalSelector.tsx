/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction } from 'react'

import { motion } from 'framer-motion'

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

  const animationXPos =
    timeIncrement === 60 ? 0 : timeIncrement === 30 ? 40 : 80

  return (
    <div className="w-48 relative" aria-label="time increment selector">
      <p className="text-xs mb-1">Time Increment:</p>
      <motion.div
        className="bg-turquoise-400 h-10 w-10 rounded absolute bottom-0 left-0"
        animate={{ x: animationXPos }}
        transition={{ ease: 'easeInOut', duration: 1 }}
      />
      <div className="flex flex-row w-full justify-between text-sm relative z-10">
        <span
          onClick={() => setTimeIncrement(60)}
          className="time-increment-selector cursor-pointer"
          aria-label="60 minute increment"
        >
          60
        </span>
        <span
          onClick={() => setTimeIncrement(30)}
          className="time-increment-selector cursor-pointer"
          aria-label="30 minute increment"
        >
          30
        </span>
        <span
          onClick={() => setTimeIncrement(15)}
          className="time-increment-selector cursor-pointer"
          aria-label="15 minute increment"
        >
          15
        </span>
      </div>
    </div>
  )
}

export default TimeIntervalSelector
