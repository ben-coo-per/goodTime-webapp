import { Form } from '@redwoodjs/forms'
import { render } from '@redwoodjs/testing/web'

import ToggleInputField from './ToggleInputField'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToggleInputField', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <Form>
          <ToggleInputField label="test" name="test" />
        </Form>
      )
    }).not.toThrow()
  })
})
