import { render } from '@redwoodjs/testing/web'

import DayFormInput from './DayFormInput'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DayFormInput', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DayFormInput />)
    }).not.toThrow()
  })
})
