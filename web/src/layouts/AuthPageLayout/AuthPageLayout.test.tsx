import { render } from '@redwoodjs/testing/web'

import AuthPageLayout from './AuthPageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AuthPageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthPageLayout />)
    }).not.toThrow()
  })
})
