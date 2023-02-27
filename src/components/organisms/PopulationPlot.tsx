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
import styled from '~/vendor/@emotion/styled'
import { usePopulationData } from '~/hooks/usePopulationData'

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

const PopulationPlotRoot = styled.div`
  display: flex;
  justify-items: center;
  position: relative;

  .loading-cell {
    position: absolute;
    top: 32px;
    right: 64px;
    background: white;
    padding: 8px;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    color: #667;
    font-size: 12px;
  }
`

export const PopulationPlot = () => {
  const { data, prefCodes, prefectures, isLoading } = usePopulationData()

  if (prefCodes.length === 0) {
    return <div>都道府県を選択してください</div>
  }

  return (
    <PopulationPlotRoot>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          margin={{ top: 24, right: 40, left: 40, bottom: 24 }}
          data={data}
        >
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
      {isLoading && <div className="loading-cell">Loading...</div>}
    </PopulationPlotRoot>
  )
}
