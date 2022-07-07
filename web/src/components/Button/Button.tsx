type ButtonProps = {
  children: React.ReactNode
  color?: 'turquoise' | 'maroon'
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
  color = 'turquoise',
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
          case 'maroon':
            if (variant == 'outline') {
              return `border border-maroon-600 text-maroon-700 hover:border-maroon-700 `
            }
            if (variant == 'ghost') {
              return `text-maroon-700  hover:bg-maroon-200 hover:text-maroon-800`
            }
            if (variant == 'link') {
              return `text-maroon-700 hover:text-maroon-800 undeline`
            }
            return `bg-maroon-700 hover:bg-maroon-800 text-white`
          default:
            if (variant == 'outline') {
              return `border border-turquoise-600 text-turquoise-700  hover:border-turquoise-700`
            }
            if (variant == 'ghost') {
              return `text-turquoise-700  hover:bg-turquoise-200 hover:text-turquoise-800`
            }
            if (variant == 'link') {
              return `text-turquoise-700 hover:text-turquoise-800 underline`
            }
            return `bg-turquoise-700 hover:bg-turquoise-800 text-white`
        }
      }
    }
    const buttonSizing = () => {
      if (variant === 'icon') {
        return 'p-2 h-min rounded-lg'
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
