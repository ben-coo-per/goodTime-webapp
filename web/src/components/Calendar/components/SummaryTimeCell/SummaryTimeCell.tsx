import { Moment } from 'moment'
import { TimeRange } from 'types/graphql'

import { toast } from '@redwoodjs/web/dist/toast'

import { Mixpanel } from 'src/utils/mixPanel'

type UserDisplay = {
  displayName: string
  color?: string
}

export interface RenderableTime
  extends Pick<TimeRange, 'startTime' | 'endTime' | 'id'> {
  user: UserDisplay
}

type SummaryTimeCellProps = {
  time: Moment
  availableUsers: UserDisplay[]
  totalNumRespondents: number
  isCollapsed?: boolean
}

const SummaryTimeCell = ({
  time,
  availableUsers,
  totalNumRespondents,
}: SummaryTimeCellProps) => {
  function handleCopy() {
    Mixpanel.track('copied date to clipboard')
    navigator.clipboard.writeText(time.format('ddd MM/DD @hh:mma'))
    toast.success(`"${time.format('ddd MM/DD @hh:mma')}" copied to clipboard`)
  }

  const classNames = () => {
    const classes = [
      'flex-none cursor-pointer rounded border text-center',
      availableUsers.length > 0
        ? 'hover:bg-indigo-100 hover:dark:bg-indigo-800 border-dark-gray text-text-default dark:text-light-gray'
        : 'bg-light-gray dark:bg-transparent dark:opacity-70 text-text-subtle dark:text-light-gray dark:text-light-gray border-light-gray',
      availableUsers.length == totalNumRespondents &&
        availableUsers.length > 0 &&
        'border-2 border-dashed border-indigo-500 dark:border-teal-500',
    ]
    return classes.join(' ')
  }
  return (
    <div className={classNames()} data-testid="time-cell">
      <button
        className="flex h-full w-full flex-col gap-0 p-2"
        onClick={handleCopy}
        aria-label={`${time.format('MM/DD hh:mm')} - selected`}
        type="button"
      >
        {time.format('hh:mma')}
        {availableUsers.length > 0 && (
          <div className="flex w-full flex-col gap-1 rounded-md bg-light-gray p-1 dark:bg-indigo-700">
            {availableUsers.map((user, i) => (
              <UserDotIndicator user={user} key={i} />
            ))}
          </div>
        )}
      </button>
    </div>
  )
}

export default SummaryTimeCell

const UserDotIndicator = ({ user }: { user: UserDisplay }) => {
  const dotClasses = () => {
    const classes = ['h-4 w-4 rounded-full', user.color]
    return classes.join(' ')
  }

  return (
    <div className="flex flex-row gap-2">
      <div className={dotClasses()} />
      <span className="text-xs">
        {user.displayName ? user.displayName : '~~~'}
      </span>
    </div>
  )
}
