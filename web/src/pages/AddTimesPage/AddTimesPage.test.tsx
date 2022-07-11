import { render } from '@redwoodjs/testing/web'

import AddTimesPage from './AddTimesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AddTimesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddTimesPage />)
    }).not.toThrow()
  })
})
