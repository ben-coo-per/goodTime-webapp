import EventResponseForm, { ProvidedTimes } from './EventResponseForm'

const times: ProvidedTimes[] = [
  {
    id: 40,
    startTime: 1662786000,
    endTime: 1662800400,
    user: {
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
      phoneNumber: '7132546843',
    },
  },
  {
    id: 41,
    startTime: 1662879600,
    endTime: 1662886800,
    user: {
      id: 'cl7tgkzqk0027jk0qawvev43f',
      displayName: 'Beb',
      phoneNumber: '7132546843',
    },
  },
]

export const generated = () => {
  return <EventResponseForm times={times} />
}

export default { title: 'Components/EventResponseForm' }
