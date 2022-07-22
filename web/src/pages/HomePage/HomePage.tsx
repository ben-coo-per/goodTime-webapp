import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/Button/Button'
import NavBar from 'src/components/NavBar/NavBar'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="bg-background h-screen">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar hasLogo={false} />
        <div className="container max-w-3xl mx-auto grid h-full">
          <div className="p-4 h-5/6 sm:p-0 sm:h-3/4 overflow-y-auto hidden-scrollbar flex flex-col gap-8 text-center pt-10">
            <img src="./text-logo-large.svg" alt="Text Logo" />
            <div>
              <h1 className="text-2xl font-display lowercase mb-2">
                Meeting times made simple
              </h1>
              <div className="w-full flex justify-center">
                <Link to={routes.createEvent()}>
                  <Button color="maroon" size="lg">
                    Find a Time
                  </Button>
                </Link>
              </div>
            </div>
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

export default HomePage
