import userEvent from '@testing-library/user-event'
import moment from 'moment'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TimeCell from './TimeCell'

describe('TimeCell', () => {
  const now = moment()
  beforeEach(() => {})

  it('renders successfully', () => {
    render(
      <TimeCell
        time={now}
        timeRanges={[]}
        handleDeselectTime={jest.fn()}
        handleSelectTime={jest.fn()}
      />
    )

    expect(screen.getByText(now.format('hh:mma'))).toBeInTheDocument()
  })

  it('calls handleSelectTime when clicked while not selected', async () => {
    const handleSelectTime = jest.fn()
    render(
      <TimeCell
        time={now}
        timeRanges={[]}
        handleDeselectTime={jest.fn()}
        handleSelectTime={handleSelectTime}
      />
    )

    const button = screen.getByRole('button')
    await waitFor(() => userEvent.click(button))
    expect(handleSelectTime).toBeCalled()
  })

  it('calls handleDeselectTime when clicked while selected', async () => {
    const handleDeselectTime = jest.fn()
    render(
      <TimeCell
        time={now}
        timeRanges={[{ startTime: now.unix() - 1, endTime: now.unix() + 1 }]}
        handleDeselectTime={handleDeselectTime}
        handleSelectTime={jest.fn()}
      />
    )

    const button = screen.getByRole('button')
    await waitFor(() => userEvent.click(button))

    expect(handleDeselectTime).toBeCalled()
  })
})
