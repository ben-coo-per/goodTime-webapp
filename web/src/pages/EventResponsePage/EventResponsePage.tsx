import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell'

const EventResponsePage = () => {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()

  return (
    <div className='sm:px-20 py-8'>
      <MetaTags title="Event Response" description="Event Response page" />
      <EventCell id={parseInt(id)} />
    </div>
  )
}

export default EventResponsePage
