import { useEffect, useRef, useState } from 'react'

import { UserCircleIcon } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

import { Link } from '@redwoodjs/router'

import { phoneNumberStyling } from 'src/utils/textFormatting'
import ThemeToggle from '../ThemeToggle/ThemeToggle'

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
        className="z-20 flex h-12 cursor-pointer flex-row items-center rounded-3xl rounded-r-lg bg-teal-800 pr-4 text-light-gray"
        aria-expanded="false"
        aria-haspopup="true"
        id="menu-button"
        onClick={() => setDropdownExpanded(!dropdownExpanded)}
      >
        <UserCircleIcon className="mr-1 h-12" />
        {displayName != undefined && displayName != ''
          ? displayName
          : phoneNumberStyling(phoneNumber)}
      </button>
      <motion.div
        hidden={dropdownExpanded ? false : true}
        animate={dropdownExpanded ? 'open' : 'closed'}
        variants={variants}
        transition={{ ease: 'easeOut', duration: 0.25 }}
        className="absolute right-0 z-10 mt-1 w-64 origin-top-right rounded-lg bg-teal-800 text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-48"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div
          className="text-md flex flex-col items-end py-1 md:text-sm"
          role="none"
        >
          <ThemeToggle className="w-5/6 px-4 " />
          <Link
            to="/"
            className="px-4 py-2 "
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            Account settings
          </Link>
          <button
            onClick={() => logOut()}
            className="px-4 py-2 "
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
