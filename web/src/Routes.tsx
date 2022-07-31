// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

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
      <WebAppLayout>
        <Private unauthenticated="login">
          <Route path="/respond/{id:Int}" page={EventResponsePage} name="eventResponse" />
          <Route path="/create-event" page={CreateEventPage} name="createEvent" />
          <Route path="/create-event/share-event/{id:Int}" page={ShareEventPage} name="shareEvent" />
        </Private>
      </WebAppLayout>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
