import { useAuth } from '@redwoodjs/auth'
import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell'

const EventResponsePage = () => {
  const { id } = useParams()
  // const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Event Response" description="Event Response page" />
      <h1>{id}</h1>
      <EventCell id={parseInt(id)} />
    </>
  )
}

export default EventResponsePage
