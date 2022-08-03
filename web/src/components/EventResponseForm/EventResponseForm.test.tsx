import { render } from '@redwoodjs/testing/web'
import { useState } from 'react'

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
function renderHook(arg0: () => any): { result: any } {
  throw new Error('Function not implemented.')
}
