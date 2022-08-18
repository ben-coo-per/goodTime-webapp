import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment, { Moment } from 'moment'
import { useState } from 'react'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import { getTimesToRender } from 'src/utils/calendarFactory'
import { colorGenerator } from 'src/utils/colorGenerator'
import SummaryTimeCell from '../components/SummaryTimeCell/SummaryTimeCell'
import TimeCell from '../components/TimeCell/TimeCell'
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
  const [showNames, setShowNames] = useState<boolean>(false)

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

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index
  // }
  // const listOfUsers = allTimes.map((t) => t.user).filter(onlyUnique)

  // // Assign a color to each user
  // const listOfColors = colorGenerator({
  //   numColors: listOfUsers.length,
  //   prefix: 'bg',
  // })
  // allTimes = allTimes.map((time) => ({
  //   ...time,
  //   user: { ...time.user, color: listOfColors[listOfUsers.indexOf(time.user)] },
  // }))

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
      <table className="sticky top-0 w-full table-auto border-separate border-spacing-1 border-b border-dark-gray bg-background">
        <thead>
          <tr>
            {daysToRender.map((day: Moment, i: number) => {
              const d = day.format('ddd-MMM DD-YYYY').split('-')
              return (
                <th
                  className="calendar-table-cell"
                  key={i}
                  role="column-header"
                >
                  <p className="text-sm font-normal leading-3 text-text-subtle">
                    {d[0]}
                  </p>
                  <p>{d[1]}</p>
                  <p className="text-sm font-normal leading-3 text-text-subtle">
                    {d[2]}
                  </p>
                </th>
              )
            })}
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
                      isCollapsed={showNames}
                    />
                  )
                }
              )}
            </div>
          )
        })}
      </div>
      <div className="sticky bottom-0 flex flex-row justify-between border-t border-dark-gray bg-background p-2">
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
