import { render } from '@redwoodjs/testing/web'

import AccountUpdateForm from './AccountUpdateForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountUpdateForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountUpdateForm />)
    }).not.toThrow()
  })
})
