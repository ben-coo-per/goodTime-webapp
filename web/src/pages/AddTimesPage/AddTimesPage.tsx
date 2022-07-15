import { useState } from 'react'

import { Form } from '@redwoodjs/forms'
// import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import CalendarSelectionInput from 'src/components/CalendarSelectionInput/CalendarSelectionInput'

// const CREATE_DAY_WITH_TIMES_MUTATION = gql`
//   mutation CreateDayWithTimesMutation(
//     $dayInput: CreateDayInput!
//     $times: [CreateTimeRangeForDayInput!]
//   ) {
//     createDayWithTimes(dayInput: $dayInput, times: $times) {
//       date
//       eventId
//       id
//       times {
//         id
//       }
//     }
//   }
// `

type SelectedTimeRange = {
  startTime: string
  endTime: string
}

const AddTimesPage = ({ id }: { id: number }) => {
  const [selectedTimeRanges, setSelectedTimeRanges] = useState<
    SelectedTimeRange[]
  >([])
  // const [createDayWithTimes, { loading }] =
  //   useMutation<CreateDayWithTimesMutation>(CREATE_DAY_WITH_TIMES_MUTATION, {
  //     onCompleted: (event) => {
  //       console.log('complete', event)
  //       // toast.success('Event created!')
  //       // navigate(routes.addTimes({ id: event.createEvent.id }))
  //     },
  //     onError: (error) => {
  //       // toast.error(error.message)
  //       console.log(error)
  //     },
  //   })

  function onSubmit(data) {
    const date = new Date(data.day)
    // createDayWithTimes({
    //   variables: {
    //     dayInput: { date, eventId: id },
    //     times: data.times,
    //   },
    // })
  }

  console.log('times: ', selectedTimeRanges)

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
          {/* <DayFormInput /> */}
          <CalendarSelectionInput />

          <Button size="lg" additionalClasses="self-end" type="submit">
            Next
          </Button>
        </Form>
      </div>
      {/* <PossibleTimesInput eventId={id} /> */}
    </>
  )
}

export default AddTimesPage
