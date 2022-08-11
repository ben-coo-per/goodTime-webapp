import { render } from '@redwoodjs/testing/web'

import PageFooter from './PageFooter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PageFooter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageFooter />)
    }).not.toThrow()
  })
})
