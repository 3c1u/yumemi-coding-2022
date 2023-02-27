import { useCallback } from 'react'
import { Checkbox } from '~/components/atoms/Checkbox'
import { CheckboxGroup } from '~/components/molecules/CheckboxGroup'
import { useUiPrefectures } from '~/hooks/ui/useUiPrefectures'
import { usePrefectures } from '~/hooks/usePrefectures'

export const PrefectureCheckboxGroup = () => {
  const { data: prefectures, isLoading } = usePrefectures()
  const [prefCodes, setPrefCodes] = useUiPrefectures()

  const handleCheck = useCallback(
    (checked: boolean, prefCode: number) => {
      if (checked) {
        setPrefCodes([...prefCodes, prefCode])
      } else {
        setPrefCodes(prefCodes.filter(code => code !== prefCode))
      }
    },
    [prefCodes, setPrefCodes],
  )

  if (isLoading) {
    return <div>Now Loading...</div>
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.5rem',
      }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: '1.25rem',
        }}
      >
        都道府県
      </h2>
      <CheckboxGroup>
        {prefectures?.map(prefecture => (
          <Checkbox
            key={prefecture.prefCode}
            value={prefecture.prefCode}
            onChange={handleCheck}
          >
            {prefecture.prefName}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  )
}
