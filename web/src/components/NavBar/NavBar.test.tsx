import { render, screen, waitFor } from '@redwoodjs/testing/web'

import NavBar from './NavBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavBar', () => {
  it('renders link to login page when user is not logged in', async () => {
    render(<NavBar />)
    await waitFor(async () => {
      const loginLink = await screen.findByRole('link', { name: 'Log in' })
      expect(loginLink).toBeInTheDocument()
    })
  })

  it('does not render a link to login page when user is logged in', async () => {
    mockCurrentUser({
      id: '123',
      displayName: 'Ben',
      phoneNumber: '7132546843',
    })

    render(<NavBar />)

    const loginLink = screen.queryByRole('link', { name: 'Log in' })
    expect(loginLink).not.toBeInTheDocument()
  })

  it('renders AuthenticatedUserMenu with display name when user detail exists', async () => {
    const displayName = 'Ben'
    mockCurrentUser({
      id: '123',
      displayName,
      phoneNumber: '7132546843',
    })

    render(<NavBar />)
    await waitFor(async () => {
      expect(screen.queryByText(displayName)).toBeInTheDocument()
    })
  })
})
