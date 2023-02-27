import { SWRConfig } from "~/vendor/swr"

export const App = () => {
  return (
    <SWRConfig>
      <div className="app">
        <h2>Hello, world!</h2>
      </div>
    </SWRConfig>
  )
}
