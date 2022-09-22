import { MoonIcon, SunIcon } from '@heroicons/react/solid'

import { switchTheme } from 'src/utils/theme'

const ThemeToggle = ({ className }: { className?: string }) => {
  // Simple toggle selector that changes the theme via the switchTheme util

  return (
    <div className={className}>
      <div className="flex w-full flex-row items-center py-1">
        <button
          aria-label="light-theme"
          className="w-full rounded-l-full border border-r-0 bg-background-light py-1 text-amber-500 dark:bg-transparent dark:text-inherit"
          onClick={() => switchTheme('light')}
        >
          <SunIcon className="h-8 w-full" />
        </button>
        <button
          aria-label="dark-theme"
          className="w-full rounded-r-full border bg-transparent py-1 text-inherit dark:bg-indigo-600 dark:text-teal-300"
          onClick={() => switchTheme('dark')}
        >
          <MoonIcon className="h-8 w-full" />
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
