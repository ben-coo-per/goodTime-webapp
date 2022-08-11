import { Dispatch, useEffect, useRef, useState } from 'react'
import { SetStateAction } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment from 'moment'

import { SelectedTimeRange } from 'src/pages/CreateEventPage/CreateEventPage'

import TimeIntervalSelector from '../TimeIntervalSelector/TimeIntervalSelector'

export type TimeIncrement = 15 | 30 | 60
interface TimeCellProps {
  time: string
  colNum: number
}

type CalendarSelectionInputProps = {
  timeRanges: SelectedTimeRange[]
  setTimeRanges: Dispatch<SetStateAction<SelectedTimeRange[]>>
}

const CalendarSelectionInput = ({
  timeRanges,
  setTimeRanges,
}: CalendarSelectionInputProps) => {
  const maxDaysShown = 4
  const oneDay = 1000 * 60 * 60 * 24
  const now = moment().unix()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [dateOffset, setDateOffset] = useState<number>(0)
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)
  const scrollableDiv = useRef(null)

  const daysShown = () => {
    const firstDay = new Date(today.getTime() + dateOffset * oneDay)
    let days: string[][] = []
    for (let i = 0; i < maxDaysShown; i++) {
      const day = new Date(firstDay.getTime() + i * oneDay)
      const pattern = /(\w{3}) (\w{3} \d{2}) (\d{4})/
      days = [...days, day.toDateString().match(pattern)]
    }
    return days
  }

  const timesShown = () => {
    const baseIncrement = 1000 * 60 * timeIncrement //set incriment to minutes
    const tomorrow = new Date(today.getTime() + oneDay).getTime()
    let times: string[] = []
    for (let t = today.getTime(); t < tomorrow; t += baseIncrement) {
      times = [...times, moment(t).format(`h:mma`)]
    }
    return times
  }

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

  const TimeCell = ({ time, colNum }: TimeCellProps) => {
    const day = daysShown()[colNum]
    const thisTime = moment(
      `${day[2]} ${day[3]} ${time}`,
      'MMM DD YYYY h:mma'
    ).unix()

    const isSelected = () => {
      if (
        timeRanges.findIndex(
          (tr) => tr.startTime <= thisTime && tr.endTime > thisTime
        ) == -1
      ) {
        return false
      }
      return true
    }

    if (thisTime < now) {
      return (
        <td className="calendar-table-cell cursor-not-allowed bg-light-gray">
          <button disabled className="h-full w-full p-2 text-text-subtle">
            {time}
          </button>
        </td>
      )
    }

    if (isSelected()) {
      return (
        <td className="calendar-table-cell bg-brand-primary-500 hover:bg-brand-primary-600">
          <button
            className="h-full w-full p-2 font-medium"
            onClick={() => handleDeselectTime(thisTime)}
          >
            {time}
          </button>
        </td>
      )
    }
    return (
      <td className="calendar-table-cell hover:bg-brand-primary-200 ">
        <button
          className="h-full w-full p-2"
          onClick={() => handleSelectTime(thisTime)}
        >
          {time}
        </button>
      </td>
    )
  }

  return (
    <>
      <div className="hidden-scrollbar my-2 h-full w-full overflow-y-auto rounded-lg border border-dark-gray">
        <table className="sticky top-0 w-full table-auto border-separate border-spacing-1 border-b border-dark-gray bg-background">
          <thead>
            <tr>
              {daysShown().map((day, i) => (
                <th className="calendar-table-cell" key={i}>
                  <p className="text-sm font-normal leading-3 text-text-subtle">
                    {day[1]}
                  </p>
                  <p>{day[2]}</p>
                  <p className="text-sm font-normal leading-3 text-text-subtle">
                    {day[3]}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <table className="w-full table-auto border-separate border-spacing-1 ">
          <tbody className="h-64 overflow-auto">
            {timesShown().map((time, i) => {
              return (
                <tr
                  key={i}
                  id={`${time}-row`}
                  ref={time === '4:00pm' ? scrollableDiv : null} // Sets scoll position to middle of day
                >
                  {Array.from(Array(maxDaysShown)).map((x, i) => (
                    <TimeCell key={i} time={time} colNum={i} />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
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
    </>
  )
}

export default CalendarSelectionInput
