import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'

import AccountUpdateForm from 'src/components/AccountUpdateForm/AccountUpdateForm'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'

const AccountPage = () => {
  return (
    <>
      <MetaTags title="Account" description="Account page" />

      <div className="h-screen bg-background-light dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container mx-auto grid max-w-3xl">
          <div className="my-8 flex flex-col gap-6 rounded py-8 sm:px-20">
            <AccountUpdateForm />
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default AccountPage
