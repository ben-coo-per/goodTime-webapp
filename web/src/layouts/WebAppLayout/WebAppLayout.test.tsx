import { render } from '@redwoodjs/testing/web'

import WebAppLayout from './WebAppLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WebAppLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WebAppLayout />)
    }).not.toThrow()
  })
})
