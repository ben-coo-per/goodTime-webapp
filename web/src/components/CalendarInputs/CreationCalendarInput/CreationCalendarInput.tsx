import { Dispatch, useEffect, useRef, useState } from 'react'
import { SetStateAction } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment, { max, Moment } from 'moment'

import { SelectedTimeRange } from 'src/pages/CreateEventPage/CreateEventPage'

import TimeIntervalSelector from '../components/TimeIntervalSelector/TimeIntervalSelector'
// import TimeCell from '../components/TimeCell/TimeCell'
import { getDaysToRender, getTimesToRender } from 'src/utils/calendarFactory'
import CalendarHeaderCell from '../components/CalendarHeaderCell/CalendarHeaderCell'
import TimeCell from '../components/TimeCell/TimeCell'

export type TimeIncrement = 15 | 30 | 60
interface TimeCellProps {
  time: string
  colNum: number
}

type CalendarSelectionInputProps = {
  timeRanges: SelectedTimeRange[]
  setTimeRanges: Dispatch<SetStateAction<SelectedTimeRange[]>>
}

const CreationCalendarInput = ({
  timeRanges,
  setTimeRanges,
}: CalendarSelectionInputProps) => {
  const maxDaysShown = 4

  const [dateOffset, setDateOffset] = useState<number>(0)
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)
  const scrollableDiv = useRef(null)

  useEffect(() => {
    if (scrollableDiv.current) {
      scrollableDiv.current.scrollIntoView({
        block: 'nearest',
      })
    }
  }, [timeIncrement])

  function handleSelectTime(time: number) {
    const updatedTimeRanges = timeRanges
    const startMatchIndex = timeRanges.findIndex(
      (tr) => tr.startTime - timeIncrement * 60 == time
    )
    const endMatchIndex = timeRanges.findIndex((tr) => tr.endTime == time)

    if (startMatchIndex != -1 && endMatchIndex != -1) {
      // Bridging the gap between two timeRanges, need to combine them...
      const startTime = timeRanges[endMatchIndex].startTime
      const endTime = timeRanges[startMatchIndex].endTime
      updatedTimeRanges.splice(startMatchIndex, 1)
      updatedTimeRanges.splice(endMatchIndex, 1)
      setTimeRanges([...updatedTimeRanges, { startTime, endTime }])
    } else if (startMatchIndex != -1) {
      // At the starting bound of an existing timeRange
      updatedTimeRanges[startMatchIndex].startTime = time

      setTimeRanges([...updatedTimeRanges])
    } else if (endMatchIndex != -1) {
      // At the ending bound of an existing timeRange
      updatedTimeRanges[endMatchIndex].endTime = time + timeIncrement * 60
      setTimeRanges([...updatedTimeRanges])
    } else {
      // No timeRange created for this time yet
      setTimeRanges([
        ...timeRanges,
        { startTime: time, endTime: time + timeIncrement * 60 },
      ])
    }
  }

  function handleDeselectTime(time: number) {
    const updatedTimeRanges = timeRanges
    const startMatchIndex = timeRanges.findIndex((tr) => tr.startTime == time)
    const endMatchIndex = timeRanges.findIndex(
      (tr) => tr.endTime == time + timeIncrement * 60
    )

    if (startMatchIndex != -1 && endMatchIndex != -1) {
      updatedTimeRanges.splice(startMatchIndex, 1)
      setTimeRanges([...updatedTimeRanges])
    } else if (startMatchIndex != -1) {
      // At the starting bound of an existing timeRange
      updatedTimeRanges[startMatchIndex].startTime = time + timeIncrement * 60

      setTimeRanges([...updatedTimeRanges])
    } else if (endMatchIndex != -1) {
      // At the ending bound of an existing timeRange
      updatedTimeRanges[endMatchIndex].endTime = time
      setTimeRanges([...updatedTimeRanges])
    } else {
      // Opening a gap between two timeRanges, need to separate them...
      const index = timeRanges.findIndex(
        (tr) => tr.startTime < time && tr.endTime > time
      )
      const tr1 = {
        startTime: timeRanges[index].startTime,
        endTime: time,
      }
      const tr2 = {
        startTime: time + timeIncrement * 60,
        endTime: timeRanges[index].endTime,
      }
      updatedTimeRanges.splice(index, 1)
      setTimeRanges([...updatedTimeRanges, tr1, tr2])
    }
  }

  const daysToRender = getDaysToRender({ maxDaysShown, dateOffset })

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="hidden-scrollbar my-2 h-full w-full overflow-y-auto rounded-lg border border-dark-gray">
        <table className="sticky top-0 w-full table-auto border-separate border-spacing-1 border-b border-dark-gray bg-background">
          <thead>
            <tr>
              {daysToRender.map((day, i) => (
                <CalendarHeaderCell day={day} key={i} />
              ))}
            </tr>
          </thead>
        </table>
        <div
          role="calendar-table"
          className="flexbox-table hidden-scrollbar::-webkit-scrollbar hidden-scrollbar h-96 overflow-y-auto"
        >
          {daysToRender.map((day: Moment, di: number) => {
            return (
              <div role="calendar-table-column" className="col" key={`${di}`}>
                {getTimesToRender({ day, timeIncrement }).map((time, ti) => {
                  return (
                    <TimeCell
                      time={time}
                      key={`${di}-${ti}`}
                      timeRanges={timeRanges}
                      handleDeselectTime={handleDeselectTime}
                      handleSelectTime={handleSelectTime}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
        <div className="sticky bottom-0 flex flex-row justify-between border-t border-dark-gray bg-background p-2">
          <TimeIntervalSelector
            timeIncrement={timeIncrement}
            setTimeIncrement={setTimeIncrement}
          />
          <div className="flex flex-row gap-3">
            {dateOffset !== 0 && (
              <button type="button" onClick={() => setDateOffset(0)}>
                back to today
              </button>
            )}
            <button
              onClick={() => setDateOffset(dateOffset - maxDaysShown)}
              type="button"
            >
              <ChevronLeftIcon className="h-10" />
            </button>
            <button
              onClick={() => setDateOffset(dateOffset + maxDaysShown)}
              type="button"
            >
              <ChevronRightIcon className="h-10" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreationCalendarInput
