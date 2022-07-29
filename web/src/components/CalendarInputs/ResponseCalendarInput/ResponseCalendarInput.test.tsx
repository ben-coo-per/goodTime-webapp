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

/*
TODO:
1. renders normally
2. correctly handles time ranges that overlap 12:00am (splitting into two days)
3. ...
*/
