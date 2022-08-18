import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Button from 'src/components/input/Button/Button'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="h-screen bg-background">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar hasLogo={false} />
        <div className="container mx-auto grid h-full max-w-3xl">
          <div className="hidden-scrollbar flex h-5/6 flex-col gap-8 overflow-y-auto p-4 pt-10 text-center sm:h-3/4 sm:p-0">
            <img src="/text-logo-large.svg" alt="Text Logo" />
            <div>
              <h1 className="mb-2 font-display text-2xl lowercase">
                Meeting times made simple
              </h1>
              <div className="flex w-full justify-center">
                <Link to={routes.createEvent()}>
                  <Button color="secondary" size="lg">
                    Find a Time
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default HomePage
