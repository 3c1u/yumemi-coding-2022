import { useUiPrefectures } from '~/hooks/ui/useUiPrefectures'
import { useEffect, useRef, useState } from 'react'
import { getPopulationCompositionPerYear } from '~/services/resas/populationCompositionPerYear'
import { usePrefectures } from '~/hooks/usePrefectures'

const kPopulationPlotYearStart = 1980
const kPopulationPlotYearEnd = 2045

type Response = Awaited<ReturnType<typeof getPopulationCompositionPerYear>>

export const usePopulationData = () => {
  const [prefCodes] = useUiPrefectures()
  const { data: prefectures } = usePrefectures()

  /*
   * { year: 2022, 東京都: 1000000, 神奈川県: 1000000,...  }[] みたいな形式になっている
   */
  const [data, setData] = useState<Record<string, string>[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 既に取得済みの都道府県がある場合はキャッシュを利用する
  const refCachedPrefectures = useRef<Record<number, Promise<Response>>>({})

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      const resGroup = await Promise.all(
        prefCodes.map(async prefCode => {
          if (prefCode in refCachedPrefectures.current) {
            return refCachedPrefectures.current[prefCode].then(
              r => [prefCode, r] as const,
            )
          }

          // キャッシュヒットしない場合はAPIを叩く
          const res = getPopulationCompositionPerYear({ prefCode })
          refCachedPrefectures.current[prefCode] = res

          return res.then(r => [prefCode, r] as const)
        }),
      )

      const dataObj: Record<number, Record<string, number>> = {}

      resGroup.forEach(([prefCode, res]) => {
        const populations = res.data.find(d => d.label === '総人口')
        if (!populations) {
          return
        }

        populations.data.forEach(population => {
          const year = population.year
          if (
            year < kPopulationPlotYearStart ||
            year > kPopulationPlotYearEnd
          ) {
            return
          }

          if (!(year in dataObj)) {
            dataObj[year] = {}
          }

          dataObj[year][`p${prefCode}`] = population.value
        })
      })

      const newData = Object.entries(dataObj).map(([year, populations]) => ({
        year,
        ...populations,
      }))

      setData(newData)
      setIsLoading(false)
    }

    void fetchData()
  }, [prefCodes])

  return {
    data,
    isLoading,
    prefectures,
    prefCodes,
  }
}
