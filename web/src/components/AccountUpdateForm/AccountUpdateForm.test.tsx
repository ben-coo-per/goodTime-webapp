import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import AccountUpdateForm from './AccountUpdateForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AccountUpdateForm', () => {
  beforeEach(() => {
    mockCurrentUser({
      displayName: 'Bobby K',
      phoneNumber: '7132546843',
      id: '123',
    })
  })

  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks()
  })

  it('renders successfully', () => {
    expect(() => {
      render(<AccountUpdateForm />)
    }).not.toThrow()
  })

  it('does not submit when the fields have not been changed', async () => {
    render(<AccountUpdateForm />)
    const submitButton = await screen.findByText('Submit')

    expect(submitButton).toBeDisabled()
  })

  it.only('allows user to update their name but not their phone number', async () => {
    mockGraphQLMutation('updateUser', (variables) => {
      return {
        updateUser: {
          phoneNumber: variables.input.phoneNumber,
          displayName: variables.input.displayName,
        },
      }
    })
    const newName = 'hello123'
    render(<AccountUpdateForm />)

    // phone number input is disabled
    const phoneNumberInput = await screen.findByLabelText('phone number')
    expect(phoneNumberInput).toBeDisabled()

    // display name input is changeable
    let displayNameInput = await screen.findByLabelText('display name')
    await waitFor(() => userEvent.clear(displayNameInput))
    await waitFor(() => userEvent.type(displayNameInput, newName))
    expect(displayNameInput).toHaveValue(newName)

    // submission
    const submitButton = await screen.findByText('Submit')
    expect(submitButton).toBeEnabled()
    await waitFor(() => userEvent.click(submitButton))
    displayNameInput = await screen.findByLabelText('display name')
    expect(displayNameInput).toHaveValue(newName)
  })
})
