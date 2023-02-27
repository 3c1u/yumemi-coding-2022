import { useUiPrefectures } from '~/hooks/ui/useUiPrefectures'

export const PopulationPlot = () => {
  const [prefCode] = useUiPrefectures()

  return (
    <div>
      {prefCode.map(code => (
        <div key={code}>{code}</div>
      ))}
    </div>
  )
}
