import { resasApiKey, resasBaseUrl, ResasResponse } from '~/services/resas'

type Payload = {
  prefCode: number
  cityCode?: number
}

type PopulationData = {
  year: number
  value: number
  rate?: number
}

type Dataset = {
  label: string
  data: PopulationData[]
}

type Response = {
  boundaryYear: number
  data: Dataset[]
}

// TODO: エラーハンドリング
export const getPopulationCompositionPerYear = async ({
  prefCode,
  cityCode,
}: Payload): Promise<Response> => {
  const res = await fetch(
    `${resasBaseUrl}/population/composition/perYear?prefCode=${prefCode}&cityCode=${
      cityCode ?? '-'
    }`,
    {
      headers: {
        'X-API-KEY': resasApiKey,
      },
    },
  )

  const json = (await res.json()) as ResasResponse<Response>
  return json.result
}
