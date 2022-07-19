import { render } from '@redwoodjs/testing/web'

import ShareEventPage from './ShareEventPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ShareEventPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShareEventPage />)
    }).not.toThrow()
  })
})
