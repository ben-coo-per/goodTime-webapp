import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment, { Moment } from 'moment'

import Button from 'src/components/Button/Button'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import { getTimesToRender } from 'src/utils/calendarFactory'

import TimeCell from '../components/TimeCell/TimeCell'
import TimeIntervalSelector from '../components/TimeIntervalSelector/TimeIntervalSelector'
import { TimeIncrement } from '../CreationCalendarInput/CreationCalendarInput'

interface ResponseCalendarInputProps {
  times: ProvidedTimes[]
  setTimeRanges: React.Dispatch<React.SetStateAction<any[]>>
  timeRanges: any[]
  isSummary?: boolean
  isDisabled?: boolean
}

const ResponseCalendarInput = ({
  times,
  setTimeRanges,
  timeRanges,
  isSummary = false,
  isDisabled = false,
}: ResponseCalendarInputProps) => {
  // ensures timeranges are in a non-readonly format
  timeRanges = timeRanges.map((tr) => ({
    startTime: tr.startTime,
    endTime: tr.endTime,
  }))
  const now = moment()
  const maxDaysShown = 4
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)

  let days: Moment[] = []
  times.forEach((t) => {
    const start = moment.unix(t.startTime)
    const end = moment.unix(t.endTime)
    if (start != end) {
      days = [...days, start, end]
    } else {
      days = [...days, start]
    }
  })

  // Dedups the array by converting to strings then converts back to moment array
  const daysList = [
    ...new Set(
      days.sort((a, b) => a.diff(b)).map((d) => d.format('YYYY-MM-DD'))
    ),
  ].map((d) => moment(d))
  const [dateOffset, setDateOffset] = useState<number>(
    daysList.filter((d) => d.isBefore(now)).length
  )

  let daysToRender = daysList
  if (daysList.length > 1 && dateOffset < daysList.length) {
    daysToRender = daysList.slice(dateOffset, dateOffset + maxDaysShown)
  }

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

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="hidden-scrollbar my-2 h-full w-full overflow-y-auto rounded-lg border border-dark-gray">
        <table className="sticky top-0 w-full table-auto border-separate border-spacing-1 border-b border-dark-gray bg-background-light dark:bg-background-dark">
          <thead>
            <tr>
              {daysToRender.map((day: Moment, i: number) => {
                const d = day.format('ddd-MMM DD-YYYY').split('-')
                return (
                  <th
                    className="calendar-table-cell"
                    key={i}
                    data-testid="column-header"
                  >
                    <p className="text-sm font-normal leading-3 text-text-subtle dark:text-dark-gray">
                      {d[0]}
                    </p>
                    <p>{d[1]}</p>
                    <p className="text-sm font-normal leading-3 text-text-subtle dark:text-dark-gray">
                      {d[2]}
                    </p>
                  </th>
                )
              })}
            </tr>
          </thead>
        </table>
        <div
          data-testid="calendar-table"
          className="flexbox-table hidden-scrollbar::-webkit-scrollbar hidden-scrollbar h-96 overflow-y-auto"
        >
          {daysToRender.map((day: Moment, di: number) => {
            return (
              <div
                data-testid="calendar-table-column"
                className="col"
                key={`${di}`}
              >
                {getTimesToRender({ day, timeIncrement, times }).map(
                  (time, ti) => {
                    return (
                      <TimeCell
                        time={time}
                        key={`${di}-${ti}`}
                        timeRanges={timeRanges}
                        handleDeselectTime={handleDeselectTime}
                        handleSelectTime={handleSelectTime}
                      />
                    )
                  }
                )}
              </div>
            )
          })}
        </div>
        <div className="sticky bottom-0 flex flex-row justify-between border-t border-dark-gray bg-background-light p-2 dark:bg-background-dark">
          <TimeIntervalSelector
            timeIncrement={timeIncrement}
            setTimeIncrement={setTimeIncrement}
          />
          {daysList.length > maxDaysShown && (
            <div className="flex flex-row gap-3">
              <button
                onClick={() => setDateOffset(dateOffset - 1)}
                type="button"
                disabled={daysList[0].isSameOrAfter(daysToRender[0])}
                className={
                  daysList[0].isSameOrAfter(daysToRender[0])
                    ? 'cursor-not-allowed text-dark-gray'
                    : ''
                }
              >
                <ChevronLeftIcon className="h-10" />
              </button>
              <button
                onClick={() => setDateOffset(dateOffset + 1)}
                type="button"
                disabled={daysList[daysList.length - 1].isSameOrBefore(
                  daysToRender[daysToRender.length - 1]
                )}
                className={
                  daysList[daysList.length - 1].isSameOrBefore(
                    daysToRender[daysToRender.length - 1]
                  )
                    ? 'cursor-not-allowed text-dark-gray'
                    : ''
                }
              >
                <ChevronRightIcon className="h-10" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row-reverse justify-between">
        <Button type="submit" disabled={isDisabled}>
          {isSummary ? 'Update' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default ResponseCalendarInput
