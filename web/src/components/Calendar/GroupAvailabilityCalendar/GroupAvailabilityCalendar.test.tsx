import { render, screen, within, waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import { ProvidedTimes } from 'src/components/EventResponseForm/EventResponseForm'
import GroupAvailabilityCalendar from './GroupAvailabilityCalendar'

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
})

describe('GroupAvailabilityCalendar', () => {
  const baseTimes: ProvidedTimes[] = [
    {
      id: 1,
      startTime: 1693335600,
      endTime: 1693346400,
      user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
    },
    {
      id: 2,
      startTime: 1693418400,
      endTime: 1693436400,
      user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
    },
    {
      id: 4,
      startTime: 1693504800,
      endTime: 1693522800,
      user: { id: 'cl6ydgdjz1327570qfuvnw03q', phoneNumber: '7132546843' },
    },
  ]

  const allTimes: ProvidedTimes[] = [
    {
      id: 5,
      startTime: 1693418400,
      endTime: 1693432800,
      user: { id: 'cl6ydjo121384570qolwg1xep', phoneNumber: '1111111111' },
    },
    {
      id: 6,
      startTime: 1693504800,
      endTime: 1693515600,
      user: { id: 'cl6ydjo121384570qolwg1xep', phoneNumber: '1111111111' },
    },
  ]

  it('renders successfully', () => {
    expect(() => {
      render(
        <GroupAvailabilityCalendar
          allTimes={allTimes}
          baseTimes={baseTimes}
          numberOfUsers={0}
        />
      )
    }).not.toThrow()
  })

  it('calls copyToClipboard when user clicks a timeCell', async () => {
    const copyToClipboard = jest.spyOn(navigator.clipboard, 'writeText')
    render(
      <GroupAvailabilityCalendar
        allTimes={allTimes}
        baseTimes={baseTimes}
        numberOfUsers={0}
      />
    )
    const timeCells = await screen.findAllByRole('time-cell')

    const button = within(timeCells[timeCells.length - 1]).getByRole('button')
    await waitFor(() => userEvent.click(button))

    expect(copyToClipboard).toBeCalled()
  })
})
