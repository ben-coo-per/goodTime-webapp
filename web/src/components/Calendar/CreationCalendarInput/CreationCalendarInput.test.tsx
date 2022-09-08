import userEvent from '@testing-library/user-event'

import { render, screen, waitFor, within } from '@redwoodjs/testing/web'

import CreationCalendarInput from './CreationCalendarInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreationCalendarInput', () => {
  const timeRanges = []
  const setTimeRanges = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
  it('renders successfully', () => {
    expect(() => {
      render(
        <CreationCalendarInput
          timeRanges={timeRanges}
          setTimeRanges={setTimeRanges}
        />
      )
    }).not.toThrow()
  })

  it('calls setTimeRanges when user clicks a timeCell', async () => {
    render(
      <CreationCalendarInput
        timeRanges={timeRanges}
        setTimeRanges={setTimeRanges}
      />
    )
    const timeCells = await screen.findAllByTestId('time-cell')

    const button = within(timeCells[timeCells.length - 1]).getByRole('button')
    await waitFor(() => userEvent.click(button))

    expect(setTimeRanges).toBeCalled()
  })
})
