import { render } from '@redwoodjs/testing/web'

import EventResponseForm from './EventResponseForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EventResponseForm', () => {
  beforeEach(() => {})

  it('renders successfully', () => {
    expect(() => {
      render(<EventResponseForm times={[]} />)
    }).not.toThrow()
  })
})
