import { useAuth } from '@redwoodjs/auth'
import { Form, Submit, TextField } from '@redwoodjs/forms'
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

// const CREATE_DAY_MUTATION = gql`

// `

const EventCreatePage = () => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
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
    createEvent({
      variables: { input: { name: data.eventName, userId: currentUser.id } },
    })
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

          <Submit className="self-end">
            <Button size="lg">Next</Button>
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default EventCreatePage
