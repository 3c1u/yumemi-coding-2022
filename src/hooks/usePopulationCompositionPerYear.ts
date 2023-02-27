import { getPopulationCompositionPerYear } from '~/services/resas/populationCompositionPerYear'
import useSWR from '~/vendor/swr'

interface Payload {
  prefCode?: number
}

export const usePopulationCompositionPerYear = ({ prefCode }: Payload) => {
  const swr = useSWR(
    prefCode !== undefined && {
      namespace: '~/hooks/usePopulationCompositionPerYear',
      prefCode,
    },
    payload => getPopulationCompositionPerYear({ prefCode: payload.prefCode }),
  )

  return swr
}
