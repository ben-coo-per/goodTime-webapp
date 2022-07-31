import { render } from '@redwoodjs/testing/web'

import EventResponseForm from './EventResponseForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventResponseForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EventResponseForm />)
    }).not.toThrow()
  })
})
