import { PopulationPlot } from '~/components/organisms/PopulationPlot'
import { PrefectureCheckboxGroup } from '~/components/organisms/PrefectureCheckboxGroup'

export const Index = () => {
  return (
    <div>
      <PrefectureCheckboxGroup />
      <PopulationPlot />
    </div>
  )
}
