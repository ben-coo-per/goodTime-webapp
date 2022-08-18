import { toast } from '@redwoodjs/web/dist/toast'
import { Moment } from 'moment'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import { phoneNumberStyling } from 'src/utils/textFormatting'
import { TimeRange, User } from 'types/graphql'

interface UserDisplay extends Pick<User, 'displayName' | 'phoneNumber' | 'id'> {
  color?: string
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
  isCollapsed = false,
}: SummaryTimeCellProps) => {
  function handleCopy() {
    navigator.clipboard.writeText(time.format('ddd MM/DD @hh:mma'))
    toast.success(`"${time.format('ddd MM/DD @hh:mma')}" copied to clipboard`)
  }

  const classNames = () => {
    const classes = [
      'flex-none cursor-pointer rounded border text-center',
      availableUsers.length > 0
        ? 'hover:bg-violet-100 border-dark-gray'
        : 'bg-light-gray text-text-subtle border-light-gray',
      availableUsers.length == totalNumRespondents &&
        availableUsers.length > 0 &&
        'border-2 border-dashed border-violet-500',
    ]
    return classes.join(' ')
  }
  return (
    <div className={classNames()} role="time-cell">
      <button
        className="flex h-full w-full flex-col gap-0 p-2"
        onClick={handleCopy}
        aria-label={`${time.format('MM/DD hh:mm')} - selected`}
        type="button"
      >
        {time.format('hh:mma')}
        {availableUsers.length > 0 && (
          <div className="flex w-full flex-col gap-1 rounded-md bg-light-gray p-1">
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
        {user.displayName
          ? user.displayName
          : phoneNumberStyling(user.phoneNumber)}
      </span>
    </div>
  )
}
