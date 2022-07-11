import { Form, Submit } from '@redwoodjs/forms'
// import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import DayFormInput from 'src/components/DayFormInput/DayFormInput'

const CREATE_DAY_WITH_TIMES_MUTATION = gql`
  mutation CreateDayWithTimesMutation(
    $dayInput: CreateDayInput!
    $times: [CreateTimeRangeForDayInput!]
  ) {
    createDayWithTimes(dayInput: $dayInput, times: $times) {
      date
      eventId
      id
      times {
        id
      }
    }
  }
`

const AddTimesPage = ({ id }: { id: number }) => {
  const [createDayWithTimes, { loading }] =
    useMutation<CreateDayWithTimesMutation>(CREATE_DAY_WITH_TIMES_MUTATION, {
      onCompleted: (event) => {
        console.log('complete', event)
        // toast.success('Event created!')
        // navigate(routes.addTimes({ id: event.createEvent.id }))
      },
      onError: (error) => {
        // toast.error(error.message)
        console.log(error)
      },
    })

  function onSubmit(data) {
    const date = new Date(data.day)
    console.log(data)
    // createDayWithTimes({
    //   variables: {
    //     dayInput: { date, eventId: id },
    //     times: [
    //       { startTime: '8:00', endTime: '10:30' },
    //       { startTime: '11:00', endTime: '12:30' },
    //     ],
    //   },
    // })
  }

  return (
    <>
      <MetaTags title="AddTimes" description="AddTimes page" />
      <div className="h-full flex flex-col">
        <Form
          onSubmit={onSubmit}
          className="flex-1 flex flex-col h-full rounded sm:px-20 py-8"
        >
          <h3 className="text-2xl font-display lowercase mb-2">
            Let’s add some times that work for you.
          </h3>
          <DayFormInput />

          <Submit className="self-end">
            <Button size="lg">Next</Button>
          </Submit>
        </Form>
      </div>
      {/* <PossibleTimesInput eventId={id} /> */}
    </>
  )
}

export default AddTimesPage
