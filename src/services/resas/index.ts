import { Serializable } from '~/types/serializable'

// TODO: import.metaまたはprocess.envから流し込む。
// FIXME: APIキーがフロントのコードにあるが、本当なら内部APIなりSSRなりを通して叩くようにすべき。
export const resasBaseUrl = 'https://opendata.resas-portal.go.jp/api/v1'
export const resasApiKey = import.meta.env.VITE_RESAS_API_KEY as string

export interface ResasResponse<_ResponsePayload extends Serializable> {
  message: string | null
  result: _ResponsePayload
}
