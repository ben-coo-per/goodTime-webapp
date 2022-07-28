import { render } from '@redwoodjs/testing/web'

import ResponseCalendarInput from './ResponseCalendarInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ResponseCalendarInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ResponseCalendarInput />)
    }).not.toThrow()
  })
})
