import { SWRConfig } from '~/vendor/swr'

export const App = () => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <div className="app">
        <h2>Hello, world!</h2>
      </div>
    </SWRConfig>
  )
}
