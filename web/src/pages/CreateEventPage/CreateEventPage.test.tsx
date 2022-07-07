import { render } from '@redwoodjs/testing/web'

import CreateEventPage from './CreateEventPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateEventPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateEventPage />)
    }).not.toThrow()
  })
})
