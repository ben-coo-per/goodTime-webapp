import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import TimeIntervalSelector from './TimeIntervalSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimeIntervalSelector', () => {
  it('renders successfully', () => {
    render(
      <TimeIntervalSelector timeIncrement={60} setTimeIncrement={jest.fn()} />
    )

    expect(screen.getByText('60')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()

    const incrementIndicator = screen.getByTestId('animatedIndicator')
    expect(incrementIndicator).toBeInTheDocument()
  })

  it('calls setTimeIncrement', async () => {
    const setTimeIncrement = jest.fn()
    render(
      <TimeIntervalSelector
        timeIncrement={60}
        setTimeIncrement={setTimeIncrement}
      />
    )

    const unselectedIncrement = screen.getByText('30')
    await waitFor(() => userEvent.click(unselectedIncrement))

    expect(setTimeIncrement).toBeCalled
  })
})
