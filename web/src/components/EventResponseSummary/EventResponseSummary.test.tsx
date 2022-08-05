import { render, screen, within, waitFor } from '@redwoodjs/testing/web'
import { ProvidedTimes } from '../EventResponseForm/EventResponseForm'
import userEvent from '@testing-library/user-event'
import EventResponseSummary from './EventResponseSummary'

const times: ProvidedTimes[] = [
  {
    id: 1,
    endTime: 1659722400,
    startTime: 1659708000,
    user: {
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
      displayName: 'Kirby',
      phoneNumber: '7132546843',
    },
  },
]

describe('EventResponseSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <EventResponseSummary times={times} selectedTimes={selectedTimes} />
      )
    }).not.toThrow()
  })

  // it('updates selected times when a time is selected', async () => {
  //   const component = <EventResponseSummary times={times} selectedTimes={[]} />
  //   render(component)

  //   let timeCells = await screen.findAllByRole('time-cell')
  //   expect(timeCells[0]).not.toHaveClass('bg-turquoise-500')
  //   const button = await within(timeCells[0]).findByRole('button')
  //   await waitFor(() => userEvent.click(button))
  //   timeCells = await screen.findAllByRole('time-cell')

  //   expect(timeCells[0]).toHaveClass('bg-turquoise-500')
  // })
})
