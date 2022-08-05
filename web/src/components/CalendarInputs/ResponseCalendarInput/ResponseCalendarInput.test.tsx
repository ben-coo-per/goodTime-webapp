import { render, screen, within, waitFor } from '@redwoodjs/testing/web'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import ResponseCalendarInput from './ResponseCalendarInput'
import userEvent from '@testing-library/user-event'

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

describe('ResponseCalendarInput', () => {
  it('renders table header successfully', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={[]}
        setTimeRanges={jest.fn()}
      />
    )

    const tableHeader = await screen.findByRole('columnheader')
    expect(await within(tableHeader).findByText('Fri')).toBeInTheDocument
    expect(await within(tableHeader).findByText('Aug 05')).toBeInTheDocument
    expect(await within(tableHeader).findByText('2022')).toBeInTheDocument
  })

  it('displays selected times', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={[
          {
            endTime: 1659722400,
            startTime: 1659708000,
          },
        ]}
        setTimeRanges={jest.fn()}
      />
    )
    const timeCells = await screen.findAllByRole('time-cell')
    timeCells.forEach((timeCell) => {
      expect(timeCell).toHaveClass('bg-turquoise-500')
    })
  })

  it('changes the selection options based on timeIncrement selector input', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={[]}
        setTimeRanges={jest.fn()}
      />
    )

    const timeIncrementSixtyMin = screen.getByLabelText('60 minute increment')
    const timeIncrementThirtyMin = screen.getByLabelText('30 minute increment')
    const timeIncrementFifteenMin = screen.getByLabelText('15 minute increment')

    let timeCells = await screen.findAllByRole('time-cell')
    expect(timeCells.length).toBe(4)
    await waitFor(() => userEvent.click(timeIncrementThirtyMin))
    timeCells = await screen.findAllByRole('time-cell')
    expect(timeCells.length).toBe(8)
    await waitFor(() => userEvent.click(timeIncrementFifteenMin))
    timeCells = await screen.findAllByRole('time-cell')
    expect(timeCells.length).toBe(16)
    await waitFor(() => userEvent.click(timeIncrementSixtyMin))
    timeCells = await screen.findAllByRole('time-cell')
    expect(timeCells.length).toBe(4)
  })
})
