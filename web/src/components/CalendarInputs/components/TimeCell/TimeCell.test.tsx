import { render } from '@redwoodjs/testing/web'

import TimeCell from './TimeCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimeCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeCell />)
    }).not.toThrow()
  })
})
