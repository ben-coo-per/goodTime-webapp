import { render, screen, within, waitFor } from '@redwoodjs/testing/web'
import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'
import userEvent from '@testing-library/user-event'
import EventResponseReview from './EventResponseReview'

const times: ProvidedTimes[] = [
  {
    id: 1,
    endTime: 1659722400,
    startTime: 1659708000,
    user: {
      id: '1',
      displayName: 'Ben',
      phoneNumber: '7132546843',
    },
  },
]

const selectedTimes: ProvidedTimes[] = [
  {
    id: 1,
    endTime: 1659722400,
    startTime: 1659708000,
    user: {
      id: '2',
      displayName: 'Kirby',
      phoneNumber: '7132546843',
    },
  },
]

describe('EventResponseSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <EventResponseReview times={times} selectedTimes={selectedTimes} />
      )
    }).not.toThrow()
  })

  // it('updates selected times when a time is selected', async () => {
  //   const component = <EventResponseSummary times={times} selectedTimes={[]} />
  //   render(component)

  //   let timeCells = await screen.findAllByRole('time-cell')
  //   expect(timeCells[0]).not.toHaveClass('bg-teal-500')
  //   const button = await within(timeCells[0]).findByRole('button')
  //   await waitFor(() => userEvent.click(button))
  //   timeCells = await screen.findAllByRole('time-cell')

  //   expect(timeCells[0]).toHaveClass('bg-teal-500')
  // })
})
