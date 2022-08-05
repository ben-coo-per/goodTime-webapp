import { UserCircleIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import AuthenticatedUserMenu, {
  AuthenticatedUserMenuDisplayProps,
} from '../AuthenticatedUserMenu/AuthenticatedUserMenu'

const NavBar = ({ hasLogo = true }: { hasLogo?: boolean }) => {
  return (
    <header className="mx-auto flex h-40 w-full flex-row-reverse items-center justify-between p-8">
      <UserElement />
      {hasLogo && (
        <Link className="cursor-pointer" to={routes.home()}>
          <img src="/text-logo.svg" alt="Text Logo" />
        </Link>
      )}
    </header>
  )
}

export default NavBar

const UserElement = () => {
  const { isAuthenticated, loading, currentUser, logOut } = useAuth()

  if (loading) {
    return (
      <div className="h-12 w-12 animate-pulse rounded-full bg-dark-gray"></div>
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
        className="flex h-12 cursor-pointer flex-row items-center rounded-3xl rounded-r-lg bg-light-gray pr-4 text-text-subtle"
      >
        <UserCircleIcon className="mr-1 h-12" />
        Log in
      </Link>
    )
  }

  return (
    <div className="h-12 rounded-full">
      <UserCircleIcon className="h-12 " />
    </div>
  )
}
