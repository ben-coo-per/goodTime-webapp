import { ArrowRightIcon, ClipboardIcon } from '@heroicons/react/solid'

import { Link, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import { Mixpanel } from 'src/utils/mixPanel'

export const QUERY = gql`
  query GetEvent($id: Int!) {
    event(id: $id) {
      id
      name
      createdAt
      times {
        id
        startTime
        endTime
        createdAt
      }
    }
  }
`

const ShareEventPage = () => {
  const { id } = useParams()
  const textToCopy = `${
    process.env.BASE_URL || 'https://goodtime.to/'
  }respond/${id}`

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy)
    toast.success('Link copied to clipboard')
    Mixpanel.track('copied share link to clipboard')
  }
  return (
    <>
      <MetaTags
        title="Share Event"
        description="Share this event with the people you're asking to come."
      />
      <div className="flex h-full flex-col gap-4 rounded py-8 sm:px-20">
        <h3 className="mb-10 font-display text-2xl lowercase">
          Let&apos;s share your event with the people you&apos;re inviting!
        </h3>
        <div className="flex flex-row items-center justify-between rounded-lg border border-dark-gray bg-light-gray p-2 pl-4 dark:bg-indigo-800">
          <span className=" mr-2 w-full select-all text-text-default dark:text-light-gray ">
            {textToCopy}
          </span>{' '}
          <Button
            variant="icon"
            additionalClasses="border border-teal-600 text-teal-700 hover:bg-teal-200 hover:text-teal-800 hover:border-teal-700"
            onClick={handleCopy}
          >
            <ClipboardIcon className="h-10 w-10" />
          </Button>
        </div>
        <div className="flex w-full flex-row justify-end">
          <Link to={routes.eventResponse({ id: JSON.parse(id) })}>
            <Button variant="ghost">
              View Responses <ArrowRightIcon className="h-10 w-10" />{' '}
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ShareEventPage
