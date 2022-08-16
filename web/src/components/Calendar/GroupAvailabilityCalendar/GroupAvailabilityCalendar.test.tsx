import { render } from '@redwoodjs/testing/web'

import GroupAvailabilityCalendar from './GroupAvailabilityCalendar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GroupAvailabilityCalendar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GroupAvailabilityCalendar />)
    }).not.toThrow()
  })
})
