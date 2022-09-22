import { Toaster } from '@redwoodjs/web/dist/toast'

import PageFooter from 'src/components/PageFooter/PageFooter'

type AuthPageLayoutProps = {
  children?: React.ReactNode
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <>
      <div className="h-screen bg-background-light dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <div className="container mx-auto grid h-full max-w-xl pt-24">
          <div className="p-4 sm:p-0 ">{children}</div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default AuthPageLayout
