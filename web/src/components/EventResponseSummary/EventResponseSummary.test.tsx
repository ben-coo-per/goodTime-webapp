import { render } from '@redwoodjs/testing/web'

import EventResponseSummary from './EventResponseSummary'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventResponseSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventResponseSummary />)
    }).not.toThrow()
  })
})
