import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'

import GroupAvailabilityCalendar from './GroupAvailabilityCalendar'

const baseTimes: ProvidedTimes[] = [
  {
    id: 1,
    startTime: 1693335600,
    endTime: 1693346400,
    user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
  },
  {
    id: 2,
    startTime: 1693418400,
    endTime: 1693436400,
    user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
  },
  {
    id: 4,
    startTime: 1693504800,
    endTime: 1693522800,
    user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
  },
]

interface TimesWColor extends ProvidedTimes {
  user: {
    id: string
    phoneNumber: string
    color: string
  }
}

const allTimes: TimesWColor[] = [
  {
    id: 5,
    startTime: 1693418400,
    endTime: 1693432800,
    user: {
      id: 'cl6ydjo121384570qolwg1xep',
      phoneNumber: '1111111111',
      color: 'bg-amber-400',
    },
  },
  {
    id: 5,
    startTime: 1693418400,
    endTime: 1693432800,
    user: {
      id: 'cl6ydjo121384570qolwg1xep',
      phoneNumber: '7132546843',
      color: 'bg-teal-400',
    },
  },
  {
    id: 6,
    startTime: 1693504800,
    endTime: 1693515600,
    user: {
      id: 'cl6ydjo121384570qolwg1xep',
      phoneNumber: '1111111111',
      color: 'bg-amber-400',
    },
  },
]

export const Default = () => {
  return (
    <div className="container mx-auto px-96">
      <GroupAvailabilityCalendar
        allTimes={allTimes}
        baseTimes={baseTimes}
        numberOfUsers={2}
      />
    </div>
  )
}

export default { title: 'Components/Calendars/GroupAvailabilityCalendar' }
