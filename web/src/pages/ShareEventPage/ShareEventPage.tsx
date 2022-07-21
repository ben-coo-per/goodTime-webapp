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
  const textToCopy = `what-time-is-good.netlify.app/respond/${id}`

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
      <div className="h-full flex flex-col rounded sm:px-20 py-8">
        <h3 className="text-2xl font-display lowercase mb-10">
          {`Let's share your event with the people you're inviting!`}
        </h3>
        {/* <EventSummary /> */}
        <div className="border border-dark-gray rounded-lg flex flex-row justify-between items-center p-2 pl-4 bg-light-gray">
          <span className=" w-fullmr-2 text-text-default select-all">
            {textToCopy}
          </span>{' '}
          <Button
            variant="icon"
            additionalClasses="border border-turquoise-600 text-turquoise-700 hover:bg-turquoise-200 hover:text-turquoise-800 hover:border-turquoise-700"
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
