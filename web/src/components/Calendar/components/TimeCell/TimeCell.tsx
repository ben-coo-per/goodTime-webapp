import moment, { Moment } from 'moment'

type TimeCellProps = {
  time: Moment
  timeRanges: any[]
  handleSelectTime: (time: number) => void
  handleDeselectTime: (time: number) => void
}

const TimeCell = ({
  time,
  timeRanges,
  handleSelectTime,
  handleDeselectTime,
}: TimeCellProps) => {
  const now = moment()
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

  if (thisTime < now.unix()) {
    const getClassName = () => {
      if (isSelected()) {
        return 'cell calendar-table-cell cursor-not-allowed bg-teal-200'
      }
      return 'cell calendar-table-cell cursor-not-allowed bg-light-gray dark:bg-transparent dark:opacity-70'
    }
    return (
      <div className={getClassName()} data-testid="time-cell">
        <button
          disabled
          className="h-full w-full p-2 text-text-subtle dark:text-dark-gray"
          aria-label={`${time.format('MM/DD hh:mm')} - disabled`}
          type="button"
        >
          {time.format('hh:mma')}
        </button>
      </div>
    )
  }

  if (isSelected()) {
    return (
      <div
        className="cell calendar-table-cell bg-indigo-300 hover:bg-indigo-400 dark:bg-indigo-600 hover:dark:bg-indigo-700"
        data-testid="time-cell"
        data-selected={true}
      >
        <button
          className="h-full w-full p-2 font-medium"
          onClick={() => handleDeselectTime(thisTime)}
          aria-label={time.format('MM/DD hh:mm')}
          type="button"
        >
          {time.format('hh:mma')}
        </button>
      </div>
    )
  }
  return (
    <div
      className="cell calendar-table-cell hover:bg-indigo-100 hover:dark:bg-indigo-700"
      data-testid="time-cell"
      data-selected={false}
    >
      <button
        className="h-full w-full p-2"
        onClick={() => handleSelectTime(thisTime)}
        aria-label={`${time.format('MM/DD hh:mm')} - selected`}
        type="button"
      >
        {time.format('hh:mma')}
      </button>
    </div>
  )
}

export default TimeCell
