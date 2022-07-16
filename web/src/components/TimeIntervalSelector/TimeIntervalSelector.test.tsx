import { render } from '@redwoodjs/testing/web'

import TimeIntervalSelector from './TimeIntervalSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimeIntervalSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeIntervalSelector />)
    }).not.toThrow()
  })
})
