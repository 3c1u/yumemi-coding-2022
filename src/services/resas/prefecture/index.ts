import { resasApiKey, resasBaseUrl, ResasResponse } from '~/services/resas'

type Prefecture = {
  prefCode: number
  prefName: string
}

type Response = Prefecture[]

// TODO: エラーハンドリング
export const getPrefecture = async (): Promise<Response> => {
  const res = await fetch(`${resasBaseUrl}/prefectures`, {
    headers: {
      'X-API-KEY': resasApiKey as string,
    },
  })

  const json = (await res.json()) as ResasResponse<Response>
  return json.result
}
