import moment, { Moment } from 'moment'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'

const oneDay = 1000 * 60 * 60 * 24
const now = moment()

type GetDaysToRenderProps = {
  maxDaysShown: number
  dateOffset: number
}

export function getDaysToRender({
  maxDaysShown,
  dateOffset,
}: GetDaysToRenderProps) {
  /*
    Takes in a date offset and a maximum number of days to show and returns an array of days (as moments)

    Note:
      Currently, I'm only using this for the event-creation calendar because setting the initial dateOffset
      for the event response calendar (to avoid showing dates that have already passed) was too difficult
      without access to the actual component's useState hook.
  */
  let days: Moment[] = []
  const firstDay = now.startOf('day')
  for (let i = 0; i < maxDaysShown; i++) {
    const day = moment(moment(firstDay).add(dateOffset, 'days')).add(i, 'days')
    days = [...days, day]
  }

  return days
}

type GetTimesToRenderProps = {
  day: Moment
  timeIncrement: number
  times?: ProvidedTimes[]
}

export function getTimesToRender({
  day,
  timeIncrement,
  times,
}: GetTimesToRenderProps) {
  /*
    Takes in a specific day and timeIncrement value along with an optional set of times
    and returns all of the renderable time for the calendar based on the selected time increment.

    ex. You want to get the calendar times for 1:00pm - 2:00pm with a 15 minute time increment on December 24th.
    --> this function will return an array of times that looks like:  [ Dec. 24th 1:00pm,
                                                                        Dec. 24th 1:15pm,
                                                                        Dec. 24th 1:30pm,
                                                                        Dec. 24th 1:45pm ]

    If you do not provide a set of times, the function will assume you want the full day.
  */

  const baseIncrement = 60 * timeIncrement //set incriment to minutes
  let timeBlocks: Moment[] = []
  const startOfDay = moment(day).startOf('day')
  const endOfDay = moment(day).endOf('day')
  if (times) {
    times
      .filter((time) => {
        // Filter to only the times that fall within this day
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
  } else {
    for (let t = startOfDay.unix(); t < endOfDay.unix(); t += baseIncrement) {
      timeBlocks = [...timeBlocks, moment.unix(t)]
    }
  }

  return timeBlocks
}
