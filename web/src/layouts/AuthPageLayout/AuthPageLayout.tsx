import { Toaster } from '@redwoodjs/web/dist/toast'

type AuthPageLayoutProps = {
  children?: React.ReactNode
}

const AuthPageLayout = ({ children }: AuthPageLayoutProps) => {
  return (
    <>
      <div className="bg-background h-screen">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <div className="container max-w-xl mx-auto grid h-full pt-24">
          <div className="p-4 sm:p-0 ">{children}</div>
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

export default AuthPageLayout
