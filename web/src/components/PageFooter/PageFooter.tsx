import { MoonIcon, SunIcon } from '@heroicons/react/solid'
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
      <div className="-my-1 bg-teal-700 p-8 text-white dark:bg-indigo-700">
        <div>social links</div>
        <div>about us</div>
        <div>etc.</div>
      </div>
      <div className="bg-teal-700 px-2 dark:bg-indigo-700">
        <span className="text-sm text-dark-gray">© Ben Cooper | 2022</span>
      </div>
    </footer>
  )
}

export default PageFooter
