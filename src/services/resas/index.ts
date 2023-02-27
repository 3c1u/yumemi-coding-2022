import { Serializable } from '~/types/serializable'

// TODO: import.metaまたはprocess.envから流し込む
export const resasBaseUrl = 'https://opendata.resas-portal.go.jp/api/v1'
export const resasApiKey = 'TODO'

export interface ResasResponse<_ResponsePayload extends Serializable> {
  message: string | null
  result: _ResponsePayload
}
