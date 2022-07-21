import { UserCircleIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import AuthenticatedUserMenu, {
  AuthenticatedUserMenuDisplayProps,
} from '../AuthenticatedUserMenu/AuthenticatedUserMenu'

const NavBar = () => {
  return (
    <header className="w-full mx-auto p-8 flex justify-between items-center">
      <Link className="cursor-pointer" to={routes.home()}>
        <img src="./text-logo.svg" alt="Text Logo" />
      </Link>
      <UserElement />
    </header>
  )
}

export default NavBar

const UserElement = () => {
  const { isAuthenticated, loading, currentUser, logOut } = useAuth()

  if (loading) {
    return (
      <div className="rounded-full h-12 w-12 bg-dark-gray animate-pulse"></div>
    )
  }
  if (currentUser) {
    const {
      displayName,
      phoneNumber,
    }: Partial<AuthenticatedUserMenuDisplayProps> = currentUser

    return (
      <AuthenticatedUserMenu
        displayName={displayName}
        phoneNumber={phoneNumber}
        logOut={logOut}
      />
    )
  }
  if (!isAuthenticated) {
    return (
      <Link
        to={routes.login()}
        className="rounded-3xl rounded-r-lg h-12 bg-light-gray text-text-subtle flex flex-row items-center pr-4 cursor-pointer"
      >
        <UserCircleIcon className="h-12 mr-1" />
        <p>Log in</p>
      </Link>
    )
  }

  return (
    <div className="rounded-full h-12">
      <UserCircleIcon className="h-12 " />
    </div>
  )
}
