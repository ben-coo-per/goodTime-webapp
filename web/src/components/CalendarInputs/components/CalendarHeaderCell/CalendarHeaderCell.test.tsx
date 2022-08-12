import { render } from '@redwoodjs/testing/web'

import CalendarHeaderCell from './CalendarHeaderCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarHeaderCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarHeaderCell day={['day', 'is', 'working']} />)
    }).not.toThrow()
  })
})
