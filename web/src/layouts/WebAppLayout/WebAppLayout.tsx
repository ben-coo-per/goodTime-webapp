import { Toaster } from '@redwoodjs/web/dist/toast'

import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'

type WebAppLayoutProps = {
  children?: React.ReactNode
}

const WebAppLayout = ({ children }: WebAppLayoutProps) => {
  return (
    <>
      <div className="h-screen bg-background-light text-text-default dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container mx-auto grid h-full max-w-3xl">
          <div className="hidden-scrollbar h-5/6 overflow-y-auto p-4 sm:h-3/4 sm:p-0">
            {children}
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default WebAppLayout
