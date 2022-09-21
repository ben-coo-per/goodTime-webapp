import { useEffect } from 'react'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button/Button'
import EventsCell from 'src/components/EventsCell'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'
import { Mixpanel } from 'src/utils/mixPanel'

const HomePage = () => {
  const { userMetadata, isAuthenticated } = useAuth()
  useEffect(() => {
    Mixpanel.track('landed on homepage')
  })

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <div className="h-screen bg-background-light dark:bg-background-dark dark:text-light-gray">
        <NavBar hasLogo={false} />
        <div className="container mx-auto grid h-full max-w-3xl">
          <div className="hidden-scrollbar flex h-5/6 flex-col overflow-y-auto p-4 pt-10 text-center sm:h-3/4 sm:p-0">
            <img src="/text-logo-large.svg" alt="Text Logo" className="mb-8" />
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
            {isAuthenticated && <EventsCell userId={userMetadata} />}
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default HomePage
