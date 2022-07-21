import { render } from '@redwoodjs/testing/web'

import AuthenticatedUserMenu from './AuthenticatedUserMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuthenticatedUserMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthenticatedUserMenu phoneNumber="7132546843" />)
    }).not.toThrow()
  })
})
