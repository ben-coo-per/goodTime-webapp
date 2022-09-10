/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Dispatch, SetStateAction } from 'react'

import { motion } from 'framer-motion'

import { Mixpanel } from 'src/utils/mixPanel'

import { TimeIncrement } from '../../CreationCalendarInput/CreationCalendarInput'

interface TimeIntervalSelectorProps {
  timeIncrement: number
  setTimeIncrement: Dispatch<SetStateAction<TimeIncrement>>
}

const TimeIntervalSelector = ({
  timeIncrement,
  setTimeIncrement,
}: TimeIntervalSelectorProps) => {
  const animationXPos =
    timeIncrement === 60 ? 0 : timeIncrement === 30 ? 37.5 : 75

  const incrementOptions = [60, 30, 15]
  return (
    <div className="relative w-40" aria-label="time increment selector">
      <p className="mb-1 text-xs">Time Increment:</p>
      <motion.div
        data-testid="animatedIndicator"
        className="absolute bottom-0 left-0 h-10 w-10 rounded border border-teal-700"
        animate={{ x: animationXPos }}
        transition={{ ease: 'easeInOut', duration: 0.25 }}
      />
      <div className="relative z-10 flex w-full flex-row justify-between text-sm">
        {incrementOptions.map((increment: TimeIncrement) => {
          return (
            <span
              key={increment}
              onClick={() => {
                Mixpanel.track('set time increment', { increment })
                setTimeIncrement(increment)
              }}
              className="time-increment-selector"
              aria-label="60 minute increment"
              data-testid="time-increment-selector"
            >
              {increment}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TimeIntervalSelector
