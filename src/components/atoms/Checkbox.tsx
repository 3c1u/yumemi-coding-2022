import { ChangeEventHandler, useCallback, useId } from 'react'
import styled from '~/vendor/@emotion/styled'

interface CheckboxProps<_Value> {
  id?: string
  name?: string
  children: React.ReactNode
  // TODO: uncontrolled componentにしたい。
  checked?: boolean
  value: _Value
  onChange?: (checked: boolean, value: _Value) => void
}

const CheckboxCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  > label {
    cursor: pointer;
    color: #667;
  }

  > input:checked + label {
    font-weight: 700;
    color: #334;
  }
`

export const Checkbox = <_Value extends unknown = undefined>({
  id,
  name,
  checked,
  onChange,
  children,
  value,
}: CheckboxProps<_Value>) => {
  const fallbackId = useId()

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => {
      const currentValue = event.currentTarget.checked
      onChange?.(currentValue, value)
    },
    [onChange, value],
  )

  if (id === undefined) {
    id = fallbackId
  }

  return (
    <CheckboxCell>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id}>{children}</label>
    </CheckboxCell>
  )
}
