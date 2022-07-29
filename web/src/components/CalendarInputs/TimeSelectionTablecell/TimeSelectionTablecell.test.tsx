import { render } from '@redwoodjs/testing/web'

import TimeSelectionTablecell from './TimeSelectionTablecell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TimeSelectionTablecell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeSelectionTablecell />)
    }).not.toThrow()
  })
})
