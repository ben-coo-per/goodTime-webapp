import { Toaster } from '@redwoodjs/web/dist/toast'

import NavBar from 'src/components/NavBar/NavBar'

type WebAppLayoutProps = {
  children?: React.ReactNode
}

const WebAppLayout = ({ children }: WebAppLayoutProps) => {
  return (
    <>
      <div className="bg-background h-screen">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container max-w-3xl mx-auto grid h-full">
          <div className="p-4 h-5/6 sm:p-0 sm:h-3/4 overflow-y-auto hidden-scrollbar">
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
