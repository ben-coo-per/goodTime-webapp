import userEvent from '@testing-library/user-event'
import moment from 'moment'

import { render, screen, within, waitFor } from '@redwoodjs/testing/web'

import SummaryTimeCell from './SummaryTimeCell'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
})

describe('SummaryTimeCell', () => {
  const now = moment()

  // it('it renders a "disabled" looking cell when there are no available users', () => {
  //   render(
  //     <SummaryTimeCell time={now} availableUsers={[]} totalNumRespondents={0} />
  //   )

  //   expect()
  // })

  it('calls setTimeRanges when user clicks a timeCell', async () => {
    const copyToClipboard = jest.spyOn(navigator.clipboard, 'writeText')
    render(
      <SummaryTimeCell time={now} availableUsers={[]} totalNumRespondents={0} />
    )
    const timeCells = await screen.findAllByTestId('time-cell')

    const button = within(timeCells[timeCells.length - 1]).getByRole('button')
    await waitFor(() => userEvent.click(button))

    expect(copyToClipboard).toBeCalled()
  })
})
