import { render, screen, waitFor } from '@redwoodjs/testing/web'
import { phoneNumberStyling } from 'src/utils/textFormatting'
import NavBar from '../NavBar/NavBar'
import userEvent from '@testing-library/user-event'
import AuthenticatedUserMenu from './AuthenticatedUserMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AuthenticatedUserMenu', () => {
  it('renders with display name when present', async () => {
    const displayName = 'Ben'
    mockCurrentUser({
      id: '123',
      displayName: displayName,
      phoneNumber: '7132546843',
    })

    render(<NavBar />)

    const authMenu = await screen.findByRole('button', { name: displayName })
    expect(authMenu).toBeInTheDocument()
  })

  it('renders with phone number when there is no display name', async () => {
    const phoneNumber = '7132546843'
    mockCurrentUser({
      id: '123',
      displayName: null,
      phoneNumber: phoneNumber,
    })
    render(<NavBar />)

    const authMenu = await screen.findByRole('button', {
      name: phoneNumberStyling(phoneNumber),
    })
    expect(authMenu).toBeInTheDocument()
  })

  it('opens the dropdown when the menu is clicked', async () => {
    mockCurrentUser({
      id: '123',
      displayName: 'Ben',
      phoneNumber: '7132546843',
    })
    render(<NavBar />)

    const authMenuButton = await screen.findByRole('button', { name: 'Ben' })
    await waitFor(() => userEvent.click(authMenuButton))
    const menu = await screen.findByRole('menu')
    await waitFor(() => expect(menu).toBeVisible())
  })

  it('logs user out when logout button is clicked', async () => {
    mockCurrentUser({
      id: '123',
      displayName: 'Ben',
      phoneNumber: '7132546843',
    })
    const logOut = jest.fn()

    render(
      <AuthenticatedUserMenu
        displayName="Ben"
        phoneNumber="7132546843"
        logOut={() => logOut()}
      />
    )

    const authMenuButton = await screen.findByRole('button', { name: 'Ben' })
    await waitFor(() => userEvent.click(authMenuButton))

    const logoutButton = await screen.findByRole('menuitem', {
      name: 'Log out',
    })
    await waitFor(() => userEvent.click(logoutButton))
    expect(logOut).toBeCalled()
  })
})
