import { useState } from 'react'
import { SelectedTimeRange } from 'src/pages/CreateEventPage/CreateEventPage'
import ResponseCalendarInput from './ResponseCalendarInput'

const timesFixture = [
  {
    id: 1,
    startTime: 1716728400,
    endTime: 1716739200,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 2,
    startTime: 1716814800,
    endTime: 1716825600,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 3,
    startTime: 1716901200,
    endTime: 1716908400,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 4,
    startTime: 1716746400,
    endTime: 1716757200,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 5,
    startTime: 1716915600,
    endTime: 1716933600,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 6,
    startTime: 1716832800,
    endTime: 1716847200,
    user: {
      id: 'cl6qxugxg2174zz0qznytpd7k',
      displayName: '',
      phoneNumber: '7132546843',
    },
  },
]

export const Default = () => {
  const [timeRanges, setTimeRanges] = useState<SelectedTimeRange[]>([])
  return (
    <div className="container mx-auto px-96">
      <ResponseCalendarInput
        timeRanges={timeRanges}
        setTimeRanges={setTimeRanges}
        times={timesFixture}
      />
    </div>
  )
}

export default { title: 'Components/Calendars/ResponseCalendarInput' }
