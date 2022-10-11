import { render } from '@redwoodjs/testing/web'

import SignUpAfterResponsePage from './SignUpAfterResponsePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignUpAfterResponsePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpAfterResponsePage />)
    }).not.toThrow()
  })
})
