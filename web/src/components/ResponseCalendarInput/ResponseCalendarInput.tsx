import moment from 'moment'
import { TimeRange } from 'types/graphql'

interface GivenTimes extends Partial<TimeRange> {
  user: any // TODO: fix this type
}

const ResponseCalendarInput = ({ times }: { times: GivenTimes[] }) => {
  let days: string[] = []

  times.forEach((t) => {
    const start = moment.unix(t.startTime).format(`ddd-MMM DD-YYYY`)
    const end = moment.unix(t.endTime).format(`ddd-MMM DD-YYYY`)
    if (start != end) {
      days = [...days, start, end]
    } else {
      days = [...days, start]
    }
  })
  const daysToRender = [...new Set(days)].map((day) => day.split('-'))

  return (
    <div className="flex flex-row gap-12 p-2">
      {daysToRender.map((day: string[], i: number) => {
        return (
          <div className="calendar-table-cell" key={i}>
            <p className="text-sm font-normal leading-3 text-text-subtle">
              {day[0]}
            </p>
            <p>{day[1]}</p>
            <p className="text-sm font-normal leading-3 text-text-subtle">
              {day[2]}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ResponseCalendarInput
