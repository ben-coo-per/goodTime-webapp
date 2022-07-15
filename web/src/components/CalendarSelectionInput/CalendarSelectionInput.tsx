import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
type TimeIncrement = 15 | 30 | 60
interface TimeCellProps {
  time: string
  colNum: number
}

const CalendarSelectionInput = () => {
  const maxDaysShown = 4
  const oneDay = 1000 * 60 * 60 * 24
  const now = moment().unix()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [dateOffset, setDateOffset] = useState<number>(0)
  const [selectedTimes, setSelectedTimes] = useState<number[]>([])
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)

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

  function handleSelectTime(time: number) {
    setSelectedTimes([...selectedTimes, time])
  }

  function handleDeselectTime(time: number) {
    setSelectedTimes(selectedTimes.filter((t) => t != time))
  }

  const TimeCell = ({ time, colNum }: TimeCellProps) => {
    const day = daysShown()[colNum]
    const thisTime = moment(
      `${day[2]} ${day[3]} ${time}`,
      'MMM DD YYYY h:mma'
    ).unix()

    if (thisTime < now) {
      return (
        <td className="calendar-table-cell bg-light-gray cursor-not-allowed">
          <button disabled className="w-full h-full p-2 text-text-subtle">
            {time}
          </button>
        </td>
      )
    }
    if (selectedTimes.includes(thisTime)) {
      return (
        <td className="calendar-table-cell bg-turquoise-500 hover:bg-turquoise-600">
          <button
            className="w-full h-full p-2 font-medium"
            onClick={() => handleDeselectTime(thisTime)}
          >
            {time}
          </button>
        </td>
      )
    }
    return (
      <td className="calendar-table-cell hover:bg-turquoise-200 ">
        <button
          className="w-full h-full p-2"
          onClick={() => handleSelectTime(thisTime)}
        >
          {time}
        </button>
      </td>
    )
  }

  return (
    <>
      <div className="w-full h-full border border-dark-gray rounded-lg my-2 overflow-y-auto hidden-scrollbar">
        <table className="table-auto w-full border-separate border-spacing-1 sticky top-0 bg-background border-dark-gray border-b">
          <thead className="">
            <tr>
              {daysShown().map((day, i) => (
                <th className="calendar-table-cell" key={i}>
                  <p className="text-text-subtle text-sm font-normal leading-3">
                    {day[1]}
                  </p>
                  <p>{day[2]}</p>
                  <p className="text-text-subtle text-sm font-normal leading-3">
                    {day[3]}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
        </table>
        <table className="table-auto w-full border-separate border-spacing-1 ">
          <tbody className="h-64 overflow-auto">
            {timesShown().map((time, i) => {
              return (
                <tr key={i} id={`${time}-row`}>
                  {Array.from(Array(maxDaysShown)).map((x, i) => (
                    <TimeCell key={i} time={time} colNum={i} />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="flex flex-row justify-between sticky bottom-0 p-2 bg-background border-dark-gray border-t">
          <div>
            <p className="text-xs">Time Increment:</p>
            <p className="text-sm">{timeIncrement}min</p>
          </div>
          <div className="flex flex-row gap-3">
            {dateOffset !== 0 && (
              <button type="button" onClick={() => setDateOffset(0)}>
                reset
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
