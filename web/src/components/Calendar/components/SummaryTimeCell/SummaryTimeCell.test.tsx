import { render } from '@redwoodjs/testing/web'

import SummaryTimeCell from './SummaryTimeCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SummaryTimeCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryTimeCell />)
    }).not.toThrow()
  })
})
