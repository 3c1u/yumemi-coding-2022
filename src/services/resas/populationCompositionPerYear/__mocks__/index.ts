import { PopulationComposition } from '~/models/population'

type Payload = {
  prefCode: number
  cityCode?: number
}

type Response = PopulationComposition

export const getPopulationCompositionPerYear = ({
  prefCode,
  cityCode,
}: Payload): Promise<Response> => {
  if (prefCode > 4 || prefCode <= 0 || cityCode !== undefined) {
    throw new Error('not implemented')
  }

  return Promise.resolve({
    boundaryYear: 2020,
    data: [
      {
        label: '総人口',
        data: Array.from({ length: 66 }, (_, i) => ({
          year: 1980 + i,
          value: 1000000 * prefCode,
        })),
      },
    ],
  })
}
