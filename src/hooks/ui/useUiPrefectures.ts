// Recoilとかを使いたいが、面倒なのでcontextを使う。再レンダリングは気にしない。

import { createContext, useContext } from 'react'

// TODO: utilsに移動
const noop = () => {
  /* no-op */
}

const uiPrefecturesContext = createContext({
  prefCodes: [] as number[],
  setPrefCodes: noop as (prefCodes: number[]) => void,
})

export const UiPrefecturesProvider = uiPrefecturesContext.Provider

export const useUiPrefectures = () => {
  const { prefCodes, setPrefCodes } = useContext(uiPrefecturesContext)
  return [prefCodes, setPrefCodes] as const
}
