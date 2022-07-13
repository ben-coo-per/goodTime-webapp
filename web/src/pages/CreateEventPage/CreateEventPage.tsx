import { useAuth } from '@redwoodjs/auth'
import { Form, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      name
    }
  }
`

const EventCreatePage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const [createEvent, { loading }] = useMutation<CreateEventMutation>(
    CREATE_EVENT_MUTATION,
    {
      onCompleted: (event) => {
        toast.success('Event created!')
        navigate(routes.addTimes({ id: event.createEvent.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  function onSubmit(data) {
    if (isAuthenticated) {
      createEvent({
        variables: { input: { name: data.eventName, userId: currentUser.id } },
      })
    } else {
      // TODO: Reroute to login page
    }
  }

  return (
    <>
      <MetaTags title="EventCreate" description="EventCreate page" />
      <div className="h-full flex flex-col">
        <Form
          onSubmit={onSubmit}
          className="flex-1 flex flex-col h-full rounded sm:px-20 py-8"
        >
          <h3 className="text-2xl font-display lowercase mb-2">
            What’s the name of your event?
          </h3>
          <TextField
            name="eventName"
            className="input"
            errorClassName="input error"
            validation={{ required: true }}
          />

          <Button size="lg" type="submit" disabled={loading}>
            Next
          </Button>
        </Form>
      </div>
    </>
  )
}

export default EventCreatePage
