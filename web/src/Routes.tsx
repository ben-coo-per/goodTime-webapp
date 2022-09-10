import { Router, Route, Private } from '@redwoodjs/router'

import AuthPageLayout from './layouts/AuthPageLayout/AuthPageLayout'
import WebAppLayout from './layouts/WebAppLayout/WebAppLayout'

const Routes = () => {
  return (
    <Router>
      <AuthPageLayout>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forget-your-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-your-password" page={ResetPasswordPage} name="resetPassword" />
      </AuthPageLayout>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/read-about-us" page={AboutPage} name="about" />
      <Route path="/edit-your-account" page={AccountPage} name="account" />
      <WebAppLayout>
        <Private unauthenticated="login">
          <Route path="/respond/{id:Int}" page={EventResponsePage} name="eventResponse" />
          <Route path="/create-an-event" page={CreateEventPage} name="createEvent" />
          <Route path="/share-your-event/{id:Int}" page={ShareEventPage} name="shareEvent" />
        </Private>
      </WebAppLayout>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
