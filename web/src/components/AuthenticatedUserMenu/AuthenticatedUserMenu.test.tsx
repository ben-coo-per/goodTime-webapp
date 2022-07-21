import { useAuth } from '@redwoodjs/auth'
import { render, renderHook } from '@redwoodjs/testing/web'

import AuthenticatedUserMenu from './AuthenticatedUserMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuthenticatedUserMenu', () => {
  it('renders successfully', () => {
    mockCurrentUser({
      id: '123',
      displayName: 'Ben',
      phoneNumber: '7132546843',
    })
    const { result } = renderHook(() => useAuth())
    expect(() => {
      render(
        <AuthenticatedUserMenu
          phoneNumber={}
          logOut={result.current.logOut()}
        />
      )
    }).not.toThrow()
  })
})
