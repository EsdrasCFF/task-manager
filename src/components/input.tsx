import { ComponentProps, forwardRef, Ref } from 'react'

interface InputProps extends ComponentProps<'input'> {
  label?: string
  errorMessage?: string | undefined
}

function Input(
  { label, errorMessage = undefined, ...rest }: InputProps,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className="flex w-full flex-col space-y-1">
      {label && <label className="text-sm font-semibold text-darkBlue">{label}</label>}
      <input
        className="w-full rounded-lg border border-gray100 px-4 py-3 text-sm font-light outline-primary"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <p className="w-full text-end text-[10px] leading-none text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default forwardRef(Input)

Input.displayName = 'Input'
