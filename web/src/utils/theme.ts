export function switchTheme(theme?: 'dark' | 'light') {
  if (!theme && localStorage.theme) {
    if (localStorage.theme === 'dark') {
      localStorage.setItem('theme', 'light')
      window.dispatchEvent(new Event('storage'))
    } else {
      localStorage.setItem('theme', 'dark')
      window.dispatchEvent(new Event('storage'))
    }
  } else {
    localStorage.setItem('theme', theme)
    window.dispatchEvent(new Event('storage'))
  }
  setThemeClass()
}

export function setThemeClass() {
  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function setDefaultTheme() {
  // set default theme if there isn't already one in local storage
  if (!('theme' in localStorage)) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      localStorage.setItem('theme', 'dark')
      window.dispatchEvent(new Event('storage'))
    } else {
      localStorage.setItem('theme', 'light')
      window.dispatchEvent(new Event('storage'))
    }
  }
  setThemeClass()
}
