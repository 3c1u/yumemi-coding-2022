import { Prefecture } from '~/models/prefecture'

type Response = Prefecture[]

export const getPrefectures = (): Promise<Response> => {
  return Promise.resolve([
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
    {
      prefCode: 3,
      prefName: '岩手県',
    },
    {
      prefCode: 4,
      prefName: '宮城県',
    },
  ])
}
