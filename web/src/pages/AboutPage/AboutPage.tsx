import { useEffect } from 'react'

import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import FeedbackForm from 'src/components/FeedbackForm/FeedbackForm'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'
import { Mixpanel } from 'src/utils/mixPanel'

const AboutPage = () => {
  useEffect(() => {
    Mixpanel.track('landed on about page')
  }, [])

  return (
    <>
      <MetaTags
        title="About"
        description="goodtime is the quickest way to find the meeting time that works"
      />
      <div className="min-h-screen bg-background-light text-text-default dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container mx-auto grid max-w-3xl">
          <div className="flex flex-col gap-6 rounded py-8 sm:px-20">
            <h1 className="font-display text-3xl lowercase">About goodtime</h1>
            <p className="lowercase leading-relaxed">
              Goodtime is the quickest way to find the meeting time that works
            </p>
            <p className="lowercase leading-relaxed">
              I built the website because I was tired of texting multiple people
              individually to find out what times they were available to meet
            </p>
            <p className="lowercase leading-relaxed">
              Of course there are wonderful products out there like Calendly,
              but that felt too formal and heavy-duty for the types of plans
              i&apos;m making on a daily basis
            </p>
            <p className="lowercase leading-relaxed">
              This is still very much a work in progress and I would love any
              feedback you can provide
            </p>
          </div>
          <FeedbackForm />
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default AboutPage
