import { render } from '@redwoodjs/testing/web'

import AppContainerHeader from './AppContainerHeader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppContainerHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppContainerHeader />)
    }).not.toThrow()
  })
})
