import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell'

const EventResponsePage = () => {
  const { id } = useParams()

  return (
    <div className="py-8 sm:px-20">
      <MetaTags title="Event Response" description="Event Response page" />
      <EventCell id={parseInt(id)} />
    </div>
  )
}

export default EventResponsePage
