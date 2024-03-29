import { useEffect } from 'react'

import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import './index.css'

import { setDefaultTheme } from './utils/theme'

const App = () => {
  useEffect(() => {
    setDefaultTheme()
  }, [])

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
        <AuthProvider type="dbAuth">
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
