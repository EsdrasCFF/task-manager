import { ComponentProps, forwardRef, Ref } from 'react'

interface InputSelectProps extends ComponentProps<'select'> {
  label: string
}

function InputSelect({ label, ...rest }: InputSelectProps, ref: Ref<HTMLSelectElement>) {
  return (
    <div className="flex w-full flex-col space-y-1">
      <label className="text-sm font-semibold text-darkBlue">{label}</label>
      <select
        {...rest}
        ref={ref}
        className="w-full rounded-lg border border-gray100 px-4 py-3 text-sm font-light outline-primary"
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
    </div>
  )
}

export default forwardRef(InputSelect)

InputSelect.displayName = 'InputSelect'
