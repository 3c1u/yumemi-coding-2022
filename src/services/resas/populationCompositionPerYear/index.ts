import { PopulationComposition } from '~/models/population'
import { resasApiKey, resasBaseUrl, ResasResponse } from '~/services/resas'

type Payload = {
  prefCode: number
  cityCode?: number
}

type Response = PopulationComposition

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
