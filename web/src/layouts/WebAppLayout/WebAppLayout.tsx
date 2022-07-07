import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

type WebAppLayoutProps = {
  children?: React.ReactNode
}

const WebAppLayout = ({ children }: WebAppLayoutProps) => {
  return (
    <div className="bg-beige-300 h-screen w-screen sm:py-24 p-2">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className="relative container max-w-3xl mx-auto h-full bg-background rounded-xl shadow-lg">
        <div className="p-4 h-full pb-20">{children}</div>
        <footer className="absolute bottom-0 w-full rounded-b-xl p-4 flex justify-between">
          <div>social links</div>
          {/* <Link to={routes.about()}>About</Link> */}
        </footer>
      </div>
    </div>
  )
}

export default WebAppLayout
