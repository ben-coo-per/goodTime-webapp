import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'

import EventResponseReview from './EventResponseReview'

const selectedTimes: ProvidedTimes[] = [
  {
    id: 41,
    startTime: 2662879600,
    endTime: 2662886800,
    user: {
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
      phoneNumber: '7132546843',
    },
  },
]

const baseTimes: ProvidedTimes[] = [
  {
    id: 40,
    startTime: 2662786000,
    endTime: 2662800400,
    user: {
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 41,
    startTime: 2662879600,
    endTime: 2662886800,
    user: {
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
      phoneNumber: '7132546843',
    },
  },
]

export const generated = () => {
  return <EventResponseReview times={baseTimes} selectedTimes={selectedTimes} />
}

export default { title: 'Components/EventResponseReview' }
