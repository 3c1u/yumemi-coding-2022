import { SWRConfig } from '~/vendor/swr'
import { DefaultLayout } from '~/layouts/DefaultLayout'
import { Index } from '~/pages'
import { UiPrefecturesProvider } from '~/hooks/ui/useUiPrefectures'
import { useState } from 'react'

export const App = () => {
  const [prefCodes, setPrefCodes] = useState<number[]>([])

  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <UiPrefecturesProvider value={{ prefCodes, setPrefCodes }}>
        <DefaultLayout>
          {/* NOTE: react-routerを入れるならここ */}
          <Index />
        </DefaultLayout>
      </UiPrefecturesProvider>
    </SWRConfig>
  )
}
