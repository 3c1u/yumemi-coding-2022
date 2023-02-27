import { useUiPrefectures } from '~/hooks/ui/useUiPrefectures'
import { useEffect, useRef, useState } from 'react'
import { getPopulationCompositionPerYear } from '~/services/resas/populationCompositionPerYear'

const kPopulationPlotYearStart = 1980
const kPopulationPlotYearEnd = 2045

type Response = Awaited<ReturnType<typeof getPopulationCompositionPerYear>>

type PopulationCompositionDataPerPrefecture = {
  prefCode: number
  res: Response
}

type PopulationCompositionGraphDataPoint = {
  year: number
  [key: string]: number
}

const transformPopulationCompositionData = (
  resGroup: PopulationCompositionDataPerPrefecture[],
): PopulationCompositionGraphDataPoint[] => {
  const dataObj: Record<number, Record<string, number>> = {}

  resGroup.forEach(({ prefCode, res }) => {
    const populations = res.data.find(d => d.label === '総人口')
    if (!populations) {
      return
    }

    populations.data.forEach(population => {
      const year = population.year
      if (year < kPopulationPlotYearStart || year > kPopulationPlotYearEnd) {
        return
      }

      if (!(year in dataObj)) {
        dataObj[year] = {}
      }

      dataObj[year][`prefecture_${prefCode}`] = population.value
    })
  })

  return Object.entries(dataObj).map(([year, populations]) => ({
    year: Number(year),
    ...populations,
  }))
}

export const usePopulationData = () => {
  const [prefCodes] = useUiPrefectures()

  /*
   * { year: 2022, 東京都: 1000000, 神奈川県: 1000000,...  }[] みたいな形式になっている
   */
  const [data, setData] = useState<PopulationCompositionGraphDataPoint[]>([])
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
              r =>
                ({
                  prefCode,
                  res: r,
                } as const),
            )
          }

          // キャッシュヒットしない場合はAPIを叩く
          const res = getPopulationCompositionPerYear({ prefCode })
          refCachedPrefectures.current[prefCode] = res

          return res.then(
            r =>
              ({
                prefCode,
                res: r,
              } as const),
          )
        }),
      )

      setData(transformPopulationCompositionData(resGroup))
      setIsLoading(false)
    }

    void fetchData()
  }, [prefCodes])

  return {
    data,
    isLoading,
    prefCodes,
  }
}
