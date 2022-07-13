import { useState } from 'react'

import moment from 'moment'
type TimeIncrement = 15 | 30 | 60

const CalendarSelectionInput = () => {
  const maxDaysShown = 4
  const oneDay = 1000 * 60 * 60 * 24
  const now = moment().format()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [dateOffset, setDateOffset] = useState<number>(0)
  const [selectedTimes, setSelectedTimes] = useState<Date[]>([])
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
    let times = []
    for (let t = today.getTime(); t < tomorrow; t += baseIncrement) {
      times = [...times, moment(t).format(`h:mma`)]
    }
    return times
  }

  function handleSelectTime(time: string, row) {
    const thisTime = new Date()
    setSelectedTimes([...selectedTimes, thisTime])
  }

  return (
    <div className="w-full h-full border border-dark-gray rounded-lg mt-2 overflow-y-auto hidden-scrollbar">
      <table className="table-auto w-full border-separate border-spacing-2 sticky top-0 bg-slate-400">
        <thead className=" bg-red-400">
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
      <table className="table-auto w-full border-separate border-spacing-2 ">
        <tbody className="h-64 bg-blue-400 overflow-auto">
          {timesShown().map((time, i) => {
            return (
              <tr key={i}>
                {Array.from(Array(maxDaysShown)).map((x, i) => (
                  <td key={i} className="calendar-table-cell">
                    {time}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-between sticky bottom-0 p-2 bg-slate-200">
        <div>{timeIncrement}min</div>
        <button
          onClick={() => setDateOffset(dateOffset - maxDaysShown)}
          type="button"
        >
          back
        </button>
        {dateOffset !== 0 && (
          <button type="button" onClick={() => setDateOffset(0)}>
            reset
          </button>
        )}
        <button
          onClick={() => setDateOffset(dateOffset + maxDaysShown)}
          type="button"
        >
          next
        </button>
      </div>
    </div>
  )
}

export default CalendarSelectionInput
