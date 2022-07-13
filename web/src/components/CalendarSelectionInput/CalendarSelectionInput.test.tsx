import { render } from '@redwoodjs/testing/web'

import CalendarSelectionInput from './CalendarSelectionInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CalendarSelectionInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CalendarSelectionInput />)
    }).not.toThrow()
  })
})
