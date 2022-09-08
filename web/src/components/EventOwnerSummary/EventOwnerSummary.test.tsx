import { render } from '@redwoodjs/testing/web'

import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'

import EventOwnerSummary from './EventOwnerSummary'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const times: ProvidedTimes[] = []
const baseTimes: ProvidedTimes[] = [
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

describe('EventOwnerSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventOwnerSummary times={times} baseTimes={baseTimes} />)
    }).not.toThrow()
  })
})
