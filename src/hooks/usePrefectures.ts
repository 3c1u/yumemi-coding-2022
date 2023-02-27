import { getPrefectures } from '~/services/resas/prefecture'
import useSWR from '~/vendor/swr'

export const usePrefectures = () => {
  const swr = useSWR(
    {
      namespace: '~/hooks/usePrefectures',
    },
    () => getPrefectures(),
  )

  return swr
}
