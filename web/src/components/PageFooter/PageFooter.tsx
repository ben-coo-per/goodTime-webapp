import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import { Link } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { switchTheme } from 'src/utils/theme'
import { Illustration } from './Illustration'

const PageFooter = () => {
  const [theme, setTheme] = useState<string>(localStorage.theme)

  useEffect(() => {
    window.addEventListener('storage', (e) => {
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
      <div className="-my-1 bg-teal-700 p-10 text-light-gray dark:bg-indigo-700">
        <Link className="hover:text-white hover:underline" to="/about">
          about goodtime
        </Link>
        <p>
          <a
            target="_blank"
            href="https://bencooper.xyz/"
            className="hover:text-white hover:underline"
          >
            my other work
          </a>
        </p>
        <p>
          built with{' '}
          <a
            target="_blank"
            href="https://redwoodjs.com/"
            className="hover:text-white hover:underline"
          >
            redwood js
          </a>
        </p>
      </div>
      <div className="bg-teal-700 px-10 pb-4 dark:bg-indigo-700 md:px-2 md:pb-0">
        <span className="text-sm text-dark-gray">© Ben Cooper | 2022</span>
      </div>
    </footer>
  )
}

export default PageFooter
