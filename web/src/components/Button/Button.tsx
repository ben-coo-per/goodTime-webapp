type ButtonProps = {
  children: React.ReactNode
  color?: 'primary' | 'secondary'
  variant?: 'default' | 'outline' | 'link' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  icon_position?: 'left' | 'right'
  disabled?: boolean
  onClick?: () => void
  additionalClasses?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button = ({
  children,
  variant = 'default',
  color = 'primary',
  size = 'md',
  icon_position = 'left',
  disabled = false,
  onClick,
  additionalClasses,
  type,
}: ButtonProps) => {
  function getClassName() {
    /* Create's a list of styles based on
    the props passed to the component */
    let classes = []

    const buttonStructure = () => {
      switch (variant) {
        case 'link':
          return 'inline'
        default:
          return 'flex justify-center items-center'
      }
    }
    const buttonColor = () => {
      if (variant !== 'icon') {
        switch (color) {
          case 'secondary':
            if (variant == 'outline') {
              return `border border-secondary-600 text-secondary-700 enabled:hover:border-secondary-700 disabled:opacity-75`
            }
            if (variant == 'ghost') {
              return `text-secondary-700  enabled:hover:bg-secondary-200 enabled:hover:text-secondary-800 disabled:opacity-75`
            }
            if (variant == 'link') {
              return `text-secondary-700 enabled:hover:text-secondary-800 undeline disabled:opacity-75`
            }
            return `bg-secondary-700 enabled:hover:bg-secondary-800 text-white disabled:opacity-75`
          default:
            if (variant == 'outline') {
              return `border border-primary-600 text-primary-700  enabled:hover:border-primary-700 disabled:opacity-75`
            }
            if (variant == 'ghost') {
              return `text-primary-700 enabled:hover:bg-primary-200 enabled:hover:text-primary-800 disabled:opacity-75`
            }
            if (variant == 'link') {
              return `text-primary-700 enabled:hover:text-primary-800 underline disabled:opacity-75`
            }
            return `bg-primary-700 enabled:hover:bg-primary-800 text-white disabled:opacity-75`
        }
      }
    }
    const buttonSizing = () => {
      if (variant === 'icon') {
        return 'p-1 h-min rounded-lg'
      }
      if (variant != 'link') {
        switch (size) {
          case 'lg':
            return 'py-4 px-6 rounded-lg'
          case 'sm':
            return 'py-1 px-2 rounded-lg'
          default:
            return 'py-2 px-4 rounded-lg'
        }
      }
      return ''
    }
    classes = [
      'font-medium gap-2',
      buttonStructure(),
      buttonColor(),
      buttonSizing(),
      icon_position == 'left' ? 'flex-row' : 'flex-row-reverse',
      additionalClasses,
    ]
    return classes.join(' ')
  }

  return (
    <button
      className={getClassName()}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
