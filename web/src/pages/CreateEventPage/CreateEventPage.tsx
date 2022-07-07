import { Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import AppContainerHeader from 'src/components/AppContainerHeader/AppContainerHeader'
import Button from 'src/components/Button/Button'

// const CREATE_EVENT_MUTATION = gql`
//   mutation CreateEventMutation($input: CreateEventInput!) {
//     createEvent(input: $input) {
//       id
//     }
//   }
// `

const EventCreatePage = () => {
  // const [createEvent, { loading }] = useMutation<
  //   CreateEventMutation,
  //   CreateEventMutationVariables
  // >(CREATE_EVENT_MUTATION, {
  //   onCompleted: (event) => {
  //     toast.success('Event created!')
  //     navigate(routes.eventCreateAddTimes({ id: event.createEvent.id }))
  //   },
  //   onError: (error) => {
  //     toast.error(error.message)
  //   },
  // })

  function onSubmit(data) {
    // createEvent({ variables: { input: { name: data.eventName } } })
    console.log(data)
  }

  return (
    <>
      <MetaTags title="EventCreate" description="EventCreate page" />
      <div className="h-full flex flex-col">
        <AppContainerHeader
          title="Event Details"
          additionalClasses="flex-none"
        />

        <Form
          onSubmit={onSubmit}
          className="flex-1 flex flex-col h-full rounded px-20 py-8"
        >
          {/* <FormError  /> */}
          <Label
            name="phone-number"
            className="label"
            errorClassName="label error"
          >
            Your Phone Number
          </Label>
          <TextField
            name="phone-number"
            placeholder="(000) 000-0000"
            className="input"
            errorClassName="input error"
            validation={{ required: true }}
          />

          <Label
            name="eventName"
            className="label"
            errorClassName="label error"
          >
            Name of Your Event
          </Label>
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
