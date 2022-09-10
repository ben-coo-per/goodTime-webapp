import { render } from '@redwoodjs/testing/web'

import LoadingIndicator from './LoadingIndicator'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LoadingIndicator', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingIndicator />)
    }).not.toThrow()
  })
})
