import { render } from '@redwoodjs/testing/web'

import EventOwnerSummary from './EventOwnerSummary'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventOwnerSummary', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventOwnerSummary />)
    }).not.toThrow()
  })
})
