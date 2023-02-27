import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from '~/vendor/recharts'
import { useUiPrefectures } from '~/hooks/ui/useUiPrefectures'
import { useEffect, useRef, useState } from 'react'
import { getPopulationCompositionPerYear } from '~/services/resas/populationCompositionPerYear'
import { usePrefectures } from '~/hooks/usePrefectures'

const kPopulationPlotYearStart = 1980
const kPopulationPlotYearEnd = 2045

type Response = Awaited<ReturnType<typeof getPopulationCompositionPerYear>>

const colormap = [
  '#1f77b4',
  '#ff7f0e',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#8c564b',
  '#e377c2',
  '#7f7f7f',
  '#bcbd22',
  '#17becf',
]

export const PopulationPlot = () => {
  const [prefCodes] = useUiPrefectures()
  const refCachedPrefectures = useRef<Record<number, Promise<Response>>>({})
  const [data, setData] = useState<Record<string, string>[]>([])

  const { data: prefectures } = usePrefectures()

  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div className="flex justify-center relative">
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          margin={{ top: 24, right: 40, left: 40, bottom: 24 }}
          data={data}
        >
          {isLoading && (
            <div className="absolute top-0 left-0 bg-white bg-opacity-50 flex justify-center items-center">
              <div className="text-gray-500">Loading...</div>
            </div>
          )}
          {prefCodes.map((prefCode, idx) => (
            <Line
              key={prefCode}
              type="monotone"
              dataKey={`p${prefCode}`}
              stroke={colormap[idx % colormap.length]}
              name={prefectures?.find(p => p.prefCode === prefCode)?.prefName}
            />
          ))}
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="year" fontSize={12} />
          <YAxis fontSize={12} />
          <Legend />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      {isLoading && (
        <div className="absolute top-8 right-16 bg-white flex justify-center items-center text-xs p-2 shadow-md">
          <div className="text-gray-500">Loading...</div>
        </div>
      )}
    </div>
  )
}
