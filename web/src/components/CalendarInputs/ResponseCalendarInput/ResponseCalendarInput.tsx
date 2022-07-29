import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import moment, { Moment } from 'moment'
import { useRef, useState } from 'react'
import { TimeRange, User } from 'types/graphql'
import { TimeIncrement } from '../CalendarSelectionInput/CalendarSelectionInput'
import TimeIntervalSelector from '../TimeIntervalSelector/TimeIntervalSelector'

interface ProvidedTimes
  extends Pick<TimeRange, 'startTime' | 'endTime' | 'id'> {
  user: Pick<User, 'displayName' | 'phoneNumber'>
}

interface ResponseCalendarInputProps {
  times: ProvidedTimes[]
  setTimeRanges: React.Dispatch<React.SetStateAction<any[]>>
  timeRanges: any[]
}

const ResponseCalendarInput = ({
  times,
  setTimeRanges,
  timeRanges,
}: ResponseCalendarInputProps) => {
  // Update times array to use moments rather than unix timestamps
  const now = moment().unix()

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
  const daysToRender = [
    ...new Set(
      days.sort((a, b) => a.diff(b)).map((d) => d.format('YYYY-MM-DD'))
    ),
  ].map((d) => moment(d))

  const getTimesToRender = (day: Moment) => {
    const baseIncrement = 60 * timeIncrement //set incriment to minutes
    let timeBlocks: Moment[] = []
    const startOfDay = day.set('hour', 0).set('minute', 0).set('second', 0)
    times
      .filter((time) => {
        const startOfDayForThisTime = moment
          .unix(time.startTime)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
        return startOfDayForThisTime.isSame(startOfDay)
      })
      .forEach((time) => {
        for (let t = time.startTime; t < time.endTime; t += baseIncrement) {
          timeBlocks = [...timeBlocks, moment.unix(t)]
        }
      })
    return timeBlocks
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

  const TimeCell = ({ time }: { time: Moment }) => {
    const thisTime = time.unix()

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
        <div className="cell calendar-table-cell cursor-not-allowed bg-light-gray">
          <button disabled className="h-full w-full p-2 text-text-subtle">
            {time.format('hh:mma')}
          </button>
        </div>
      )
    }

    if (isSelected()) {
      return (
        <div className="cell calendar-table-cell bg-turquoise-500 hover:bg-turquoise-600">
          <button
            className="h-full w-full p-2 font-medium"
            onClick={() => handleDeselectTime(thisTime)}
          >
            {time.format('hh:mma')}
          </button>
        </div>
      )
    }
    return (
      <div className="cell calendar-table-cell hover:bg-turquoise-200 ">
        <button
          className="h-full w-full p-2"
          onClick={() => handleSelectTime(thisTime)}
        >
          {time.format('hh:mma')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-row gap-12 p-2">
      <div className="hidden-scrollbar my-2 h-full w-full overflow-y-auto rounded-lg border border-dark-gray">
        <table className="sticky top-0 w-full table-auto border-separate border-spacing-1 border-b border-dark-gray bg-background">
          <thead>
            <tr>
              {daysToRender.map((day: Moment, i: number) => {
                const d = day.format('ddd-MMM DD-YYYY').split('-')
                return (
                  <th className="calendar-table-cell" key={i}>
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
        <div className="flexbox-table hidden-scrollbar::-webkit-scrollbar hidden-scrollbar h-96 overflow-y-auto">
          {daysToRender.map((day: Moment, di: number) => {
            return (
              <div className="col" key={`${di}`}>
                {getTimesToRender(day).map((time, ti) => {
                  return <TimeCell time={time} key={`${di}-${ti}`} />
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
          {daysToRender.length > maxDaysShown && (
            <div className="flex flex-row gap-3">
              <button
                onClick={() => console.log('backward pagination')}
                type="button"
              >
                <ChevronLeftIcon className="h-10" />
              </button>
              <button
                onClick={() => console.log('forward pagination')}
                type="button"
              >
                <ChevronRightIcon className="h-10" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResponseCalendarInput
