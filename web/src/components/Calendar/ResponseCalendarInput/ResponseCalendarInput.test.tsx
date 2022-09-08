/* eslint-disable no-unused-expressions */
import userEvent from '@testing-library/user-event'

import { render, screen, within, waitFor } from '@redwoodjs/testing/web'

import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'

import ResponseCalendarInput from './ResponseCalendarInput'

describe('ResponseCalendarInput', () => {
  const times: ProvidedTimes[] = [
    {
      id: 1,
      endTime: 1817600090,
      startTime: 1817589290,
      user: {
        id: '134',
        displayName: 'Ben',
        phoneNumber: '7132546843',
      },
    },
  ]

  const timeRanges = [
    {
      endTime: 1817600090,
      startTime: 1817589290,
    },
  ]

  it('renders table header successfully', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={[]}
        setTimeRanges={jest.fn()}
      />
    )

    const tableHeader = await screen.findByTestId('column-header')
    expect(await within(tableHeader).findByText('Fri')).toBeInTheDocument
    expect(await within(tableHeader).findByText('Aug 06')).toBeInTheDocument
    expect(await within(tableHeader).findByText('2027')).toBeInTheDocument
  })

  it('displays selected times', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={timeRanges}
        setTimeRanges={jest.fn()}
      />
    )
    const timeCells = await screen.findAllByTestId('time-cell')
    timeCells.forEach((timeCell) => {
      expect(timeCell).toHaveClass('bg-indigo-300')
    })
  })

  it('changes the selection options based on timeIncrement selector input', async () => {
    render(
      <ResponseCalendarInput
        times={times}
        timeRanges={timeRanges}
        setTimeRanges={jest.fn()}
      />
    )

    const timeIncrementSixtyMin = await screen.findByLabelText(
      '60 minute increment'
    )

    const timeIncrementThirtyMin = await screen.findByLabelText(
      '30 minute increment'
    )

    const timeIncrementFifteenMin = await screen.findByLabelText(
      '15 minute increment'
    )

    let timeCells = await screen.findAllByTestId('time-cell')
    waitFor(async () => {
      timeCells
    })
    expect(timeCells.length).toBe(3)
    await waitFor(() => userEvent.click(timeIncrementThirtyMin))
    timeCells = await screen.findAllByTestId('time-cell')
    expect(timeCells.length).toBe(6)
    await waitFor(() => userEvent.click(timeIncrementFifteenMin))
    timeCells = await screen.findAllByTestId('time-cell')
    expect(timeCells.length).toBe(12)
    await waitFor(() => userEvent.click(timeIncrementSixtyMin))
    timeCells = await screen.findAllByTestId('time-cell')
    expect(timeCells.length).toBe(3)
  })
})
