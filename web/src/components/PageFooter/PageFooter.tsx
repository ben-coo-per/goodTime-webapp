import { useEffect, useState } from 'react'

import { MoonIcon, SunIcon } from '@heroicons/react/solid'

import { Link, routes } from '@redwoodjs/router'

import { Illustration } from './Illustration'

const PageFooter = () => {
  const [theme, setTheme] = useState<string>(localStorage.theme)

  useEffect(() => {
    window.addEventListener('storage', () => {
      setTheme(localStorage.getItem('theme'))
    })
  }, [])

  return (
    <footer className="mx-auto flex w-full flex-col bg-background-light pb-0 dark:bg-background-dark">
      <div className="flex w-full items-end justify-end p-20">
        {theme === 'dark' ? (
          <MoonIcon className="h-32 text-indigo-200" />
        ) : (
          <SunIcon className="h-32 text-amber-300" />
        )}
      </div>
      <Illustration />
      <div className="-my-1 flex flex-col gap-2 bg-teal-700 p-10 text-gray-200 dark:bg-indigo-700 sm:flex-row sm:gap-6">
        <Link className="hover:text-white hover:underline" to={routes.home()}>
          Home
        </Link>
        <Link className="hover:text-white hover:underline" to={routes.about()}>
          About
        </Link>
        <Link
          className="hover:text-white hover:underline"
          to={routes.contactUs()}
        >
          Contact Us
        </Link>
      </div>
      <div className="flex flex-row justify-between bg-teal-700 px-10 pb-4 dark:bg-indigo-700 ">
        <span className="text-sm text-gray-300">
          ©{' '}
          <a
            target="_blank"
            href="https://bencooper.xyz/"
            className="hover:text-white hover:underline"
            rel="noreferrer"
          >
            Ben Cooper
          </a>{' '}
          | 2022
        </span>
        <p className="text-sm text-gray-300">
          Built with{' '}
          <a
            target="_blank"
            href="https://redwoodjs.com/"
            className="hover:text-white hover:underline"
            rel="noreferrer"
          >
            Redwood JS
          </a>
        </p>
      </div>
    </footer>
  )
}

export default PageFooter
