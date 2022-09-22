import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@redwoodjs/testing/web'

import * as themeUtils from 'src/utils/theme'

import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeToggle />)
    }).not.toThrow()
  })

  it('calls switchTheme to light when the light-mode button is clicked', async () => {
    const switchTheme = jest.spyOn(themeUtils, 'switchTheme')
    render(<ThemeToggle />)

    const lightThemeButton = screen.getByLabelText('light-theme')
    await waitFor(() => userEvent.click(lightThemeButton))
    expect(switchTheme).toBeCalledWith('light')
  })

  it('calls switchTheme to dark when the dark-mode button is clicked', async () => {
    const switchTheme = jest.spyOn(themeUtils, 'switchTheme')
    render(<ThemeToggle />)

    const darkThemeButton = screen.getByLabelText('dark-theme')
    await waitFor(() => userEvent.click(darkThemeButton))
    expect(switchTheme).toBeCalledWith('dark')
  })
})
