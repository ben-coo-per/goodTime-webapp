import ThemeToggle from './ThemeToggle'

export const generated = () => {
  return (
    <div className="grid h-screen place-items-center text-white dark:bg-indigo-100">
      <div className="w-48 place-items-center rounded-lg bg-teal-800 p-10">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default { title: 'Components/ThemeToggle' }
