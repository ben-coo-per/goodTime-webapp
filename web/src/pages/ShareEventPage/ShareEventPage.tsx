import { ClipboardIcon } from '@heroicons/react/solid'

import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
// import { MetaTags, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'

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
  const textToCopy = `www.goodtime.to/response/${id}`

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy)
    toast.success('Link copied to clipboard')
  }
  return (
    <>
      <MetaTags
        title="Share Event"
        description="Share this event with the people you're asking to come."
      />
      <div className="flex h-full flex-col rounded py-8 sm:px-20">
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
      </div>
    </>
  )
}

export default ShareEventPage

// const EventSummary = () => {
//   const { loading, error, data } = useQuery(QUERY)
//   if (loading) {
//     return <p>loading...</p>
//   }
//   return <p>mm</p>
// }
