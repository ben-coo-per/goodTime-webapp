import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, useForm } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/dist/toast'
import NavBar from 'src/components/NavBar/NavBar'
import PageFooter from 'src/components/PageFooter/PageFooter'

const AccountPage = () => {
  const { currentUser, loading } = useAuth()
  console.log(currentUser)
  const formMethods = useForm({
    defaultValues: currentUser,
  })

  return (
    <>
      <MetaTags title="Account" description="Account page" />

      <div className="h-screen bg-background-light dark:bg-background-dark dark:text-light-gray">
        <Toaster toastOptions={{ className: 'toast', duration: 6000 }} />
        <NavBar />
        <div className="container mx-auto grid max-w-3xl">
          <div className="my-8 flex flex-col gap-6 rounded py-8 sm:px-20">
            <Form
              className="my-4 flex flex-col gap-2 rounded-xl bg-white p-8 shadow dark:bg-indigo-800"
              formMethods={formMethods}
            >
              <h2 className="mb-4 font-display text-xl lowercase">
                Your Account
              </h2>

              <Label name="phoneNumber" className="label mt-8 opacity-60">
                phone number
              </Label>
              <TextField
                name="phoneNumber"
                className="input cursor-not-allowed opacity-60"
                disabled
              />

              <Label name="displayName" className="label mt-8 ">
                display name
              </Label>
              <TextField name="displayName" className="input" />
            </Form>
          </div>
        </div>
      </div>
      <PageFooter />
    </>
  )
}

export default AccountPage
