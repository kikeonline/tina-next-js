
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  // backgroundColor?: string
  /**
   * How large should the button be?
   */
  // size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  // size = 'medium',
  // backgroundColor,
  label,
  ...props
}) => {
  const mode = primary ? 'bg-primary' : 'bg-white text-neutral-dark'
  return (
    <button type='button' className={['font-montserrat font-semibold text-sm uppercase py-4 px-7 bg-primary', mode].join(' ')} {...props}>
      {label}
    </button>
  )
}
