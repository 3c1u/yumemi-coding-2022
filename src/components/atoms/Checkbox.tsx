import { ChangeEventHandler, useCallback, useId } from 'react'

interface CheckboxProps {
  id?: string
  children: React.ReactNode
  // TODO: uncontrolled componentにしたい。
  checked: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = ({
  id,
  checked,
  onChange,
  children,
}: CheckboxProps) => {
  const fallbackId = useId()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const currentValue = event.currentTarget.checked
      onChange?.(currentValue)
    },
    [onChange],
  )

  if (id === undefined) {
    id = fallbackId
  }

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <label htmlFor={id}>{children}</label>
    </div>
  )
}
