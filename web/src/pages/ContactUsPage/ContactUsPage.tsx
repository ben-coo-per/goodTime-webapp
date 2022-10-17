import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import FeedbackForm from 'src/components/FeedbackForm/FeedbackForm'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'

const ContactUsPage = () => {
  return (
    <>
      <MetaTags
        title="Contact Us"
        description="Tell us how we're doing or get in touch with us"
      />
      <div className="min-h-screen bg-background-light text-text-default dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container mx-auto grid max-w-3xl px-6 sm:px-0">
          <FeedbackForm title="We'd love to hear from you!" />
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default ContactUsPage
