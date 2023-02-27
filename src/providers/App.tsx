import { SWRConfig } from '~/vendor/swr'
import { DefaultLayout } from '~/layouts/DefaultLayout'
import { Index } from '~/pages'

export const App = () => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <DefaultLayout>
        {/* NOTE: react-routerを入れるならここ */}
        <Index />
      </DefaultLayout>
    </SWRConfig>
  )
}
