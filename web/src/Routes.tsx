import { Router, Route, Private } from '@redwoodjs/router'

import AuthPageLayout from './layouts/AuthPageLayout/AuthPageLayout'
import WebAppLayout from './layouts/WebAppLayout/WebAppLayout'

const Routes = () => {
  return (
    <Router>
      <AuthPageLayout>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </AuthPageLayout>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/account" page={AccountPage} name="account" />
      <WebAppLayout>
        <Private unauthenticated="login">
          <Route path="/response/{id:Int}" page={EventResponsePage} name="eventResponse" />
          <Route path="/create-event" page={CreateEventPage} name="createEvent" />
          <Route path="/create-event/share-event/{id:Int}" page={ShareEventPage} name="shareEvent" />
        </Private>
      </WebAppLayout>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
