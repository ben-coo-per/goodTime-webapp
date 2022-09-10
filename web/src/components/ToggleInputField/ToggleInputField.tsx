import { FieldError, useErrorStyles, useRegister } from '@redwoodjs/forms'

type ToggleInputFieldProps = {
  label: string
  name: string
  validation?: object
}

const ToggleInputField = ({
  label,
  name,
  validation,
}: ToggleInputFieldProps) => {
  const register = useRegister({
    name,
    validation: { ...validation },
  })

  const { className: labelClassName, style: labelStyle } = useErrorStyles({
    className: `label mt-8 `,
    errorClassName: `label error mt-8 `,
    name,
  })

  return (
    <>
      <span className={labelClassName} style={labelStyle}>
        {label}
      </span>
      <label
        htmlFor={name}
        className="relative mb-4 flex cursor-pointer items-center"
      >
        <input type="checkbox" id={name} className="sr-only" {...register} />
        <div className="toggle-bg h-[2.8rem] w-[4.75rem] rounded-lg border border-dark-gray dark:bg-indigo-900"></div>
      </label>
      <FieldError name={name} className="field-error" />
    </>
  )
}

export default ToggleInputField
