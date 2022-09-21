import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment, { Moment } from 'moment'

import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import { getTimesToRender } from 'src/utils/calendarFactory'

import SummaryTimeCell from '../components/SummaryTimeCell/SummaryTimeCell'
import TimeIntervalSelector from '../components/TimeIntervalSelector/TimeIntervalSelector'
import { TimeIncrement } from '../CreationCalendarInput/CreationCalendarInput'

interface GroupAvailabilityCalendarProps {
  baseTimes: ProvidedTimes[]
  allTimes: ProvidedTimes[]
  numberOfUsers: number
}

const GroupAvailabilityCalendar = ({
  baseTimes,
  allTimes,
  numberOfUsers,
}: GroupAvailabilityCalendarProps) => {
  const now = moment()
  const maxDaysShown = 4
  const [timeIncrement, setTimeIncrement] = useState<TimeIncrement>(60)

  let days: Moment[] = []
  baseTimes.forEach((t) => {
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

  return (
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
              {getTimesToRender({ day, timeIncrement, times: baseTimes }).map(
                (time, ti) => {
                  const availableUsers = allTimes
                    .filter((t) => {
                      const start = moment.unix(t.startTime)
                      const end = moment.unix(t.endTime)

                      return time.isSameOrAfter(start) && time.isBefore(end)
                    })
                    .map((t) => t.user)
                  return (
                    <SummaryTimeCell
                      time={time}
                      key={`${di}-${ti}`}
                      availableUsers={availableUsers}
                      totalNumRespondents={numberOfUsers}
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
  )
}

export default GroupAvailabilityCalendar
