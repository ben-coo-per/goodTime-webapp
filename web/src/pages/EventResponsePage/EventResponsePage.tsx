import { useEffect } from 'react'

import { useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import EventCell from 'src/components/EventCell'
import { Mixpanel } from 'src/utils/mixPanel'

const EventResponsePage = () => {
  const { id } = useParams()

  useEffect(() => {
    Mixpanel.track('landed on response page', { eventId: id })
  }, [id])

  return (
    <div className="py-8 sm:px-20">
      <MetaTags title="Event Response" description="Event Response page" />
      <EventCell id={parseInt(id)} />
    </div>
  )
}

export default EventResponsePage
