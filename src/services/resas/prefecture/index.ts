import { Prefecture } from '~/models/prefecture'
import { resasApiKey, resasBaseUrl, ResasResponse } from '~/services/resas'

type Response = Prefecture[]

// TODO: エラーハンドリング
export const getPrefectures = async (): Promise<Response> => {
  const res = await fetch(`${resasBaseUrl}/prefectures`, {
    headers: {
      'X-API-KEY': resasApiKey,
    },
  })

  const json = (await res.json()) as ResasResponse<Response>
  return json.result
}
