import { render } from '@redwoodjs/testing/web'

import EventResponsePage from './EventResponsePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EventResponsePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventResponsePage />)
    }).not.toThrow()
  })
})
