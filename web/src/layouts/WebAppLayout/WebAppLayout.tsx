import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type WebAppLayoutProps = {
  children?: React.ReactNode
}

const WebAppLayout = ({ children }: WebAppLayoutProps) => {
  return (
    <>
      <div className="bg-background h-screen">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <header className="w-full mx-auto p-4 flex justify-between bg-blue-500">
          <div>Logo</div>
          <div>Account</div>
        </header>
        <div className="container max-w-3xl mx-auto grid place-items-center h-full">
          <div className="p-4 sm:p-0 h-3/4 overflow-y-auto hidden-scrollbar">
            {children}
          </div>
        </div>
      </div>
      <footer className="w-full mx-auto pb-0 flex flex-col bg-beige-500">
        <div className="p-8">
          <div>social links</div>
          <div>about us</div>
          <div>etc.</div>
        </div>
        <div className="h-32 bg-beige-700 p-8">
          illustration of people hanging out in park
        </div>
      </footer>
    </>
  )
}

export default WebAppLayout
