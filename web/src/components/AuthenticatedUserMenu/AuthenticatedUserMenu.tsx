import { useEffect, useRef, useState } from 'react'

import { UserCircleIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

import { Link } from '@redwoodjs/router'

import { phoneNumberStyling } from 'src/utils/textFormatting'

export type AuthenticatedUserMenuDisplayProps = {
  phoneNumber: string
  displayName?: string
  logOut: (options?: unknown) => Promise<any>
}

const AuthenticatedUserMenu = ({
  phoneNumber,
  displayName,
  logOut,
}: AuthenticatedUserMenuDisplayProps) => {
  const [dropdownExpanded, setDropdownExpanded] = useState<boolean>(false)
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -3 },
  }
  const ref = useRef(null)

  useEffect(() => {
    // Handle closing dropdown when user clicks outside
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        dropdownExpanded
      ) {
        setDropdownExpanded(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, dropdownExpanded])

  return (
    <div className="relative" ref={ref}>
      <button
        className="rounded-3xl rounded-r-lg h-12 bg-turquoise-900 text-light-gray flex flex-row items-center pr-4 cursor-pointer z-20"
        aria-expanded="false"
        aria-haspopup="true"
        id="menu-button"
        onClick={() => setDropdownExpanded(!dropdownExpanded)}
      >
        <UserCircleIcon className="h-12 mr-1" />
        <p>
          {displayName != null ? displayName : phoneNumberStyling(phoneNumber)}
        </p>
      </button>
      <motion.div
        hidden={dropdownExpanded ? false : true}
        animate={dropdownExpanded ? 'open' : 'closed'}
        variants={variants}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className="origin-top-right absolute right-0 mt-1 w-56 z-10 rounded-lg shadow-lg bg-turquoise-900 text-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <Link
            to="/"
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            Account settings
          </Link>
          <button
            onClick={() => logOut()}
            className="block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1"
          >
            Log out
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthenticatedUserMenu
